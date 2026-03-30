<?php
// ============================================================
// api-gallery-folders.php — Gallery Folders
// GET    → semua folder + item count (public)
// POST   → create folder (admin)
// PUT    → update folder (admin)
// DELETE → delete folder (admin, items dipindah ke null)
// ============================================================
require_once __DIR__ . '/db.php';
cors();

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($method) {

    case 'GET':
        if ($id) {
            $stmt = $pdo->prepare(
                'SELECT f.*, COUNT(i.id) as item_count
                 FROM gallery_folders f
                 LEFT JOIN gallery_items i ON i.folder_id = f.id AND i.is_active = 1
                 WHERE f.id = ?
                 GROUP BY f.id'
            );
            $stmt->execute([$id]);
            $row = $stmt->fetch();
            if (!$row)
                respond(['error' => 'Folder tidak ditemukan'], 404);
            $row['cover_url'] = file_url($row['cover_image']);
            $row['is_active'] = (bool)$row['is_active'];
            respond($row);
        }

        $activeOnly = !isset($_GET['all']); // tanpa ?all → hanya aktif
        $sql = 'SELECT f.*, COUNT(i.id) as item_count
                FROM gallery_folders f
                LEFT JOIN gallery_items i ON i.folder_id = f.id AND i.is_active = 1'
            . ($activeOnly ? ' WHERE f.is_active = 1' : '')
            . ' GROUP BY f.id ORDER BY f.sort_order ASC, f.id ASC';

        $rows = $pdo->query($sql)->fetchAll();
        foreach ($rows as &$r) {
            $r['cover_url'] = file_url($r['cover_image']);
            $r['is_active'] = (bool)$r['is_active'];
            $r['item_count'] = (int)$r['item_count'];
        }

        // Hitung total SEMUA item aktif (termasuk yang folder_id IS NULL)
        $totalAll = (int)$pdo->query(
            'SELECT COUNT(*) FROM gallery_items WHERE is_active = 1'
        )->fetchColumn();

        respond([
            'folders' => $rows,
            'total_all' => $totalAll,
        ]);
        break;

    case 'POST':
        auth_check();
        $body = get_body();
        if (empty($body['name']))
            respond(['error' => "Field 'name' wajib diisi"], 400);

        $stmt = $pdo->prepare(
            'INSERT INTO gallery_folders (name, description, cover_image, sort_order, is_active)
             VALUES (:name, :description, :cover_image, :sort_order, :is_active)'
        );
        $stmt->execute([
            ':name' => $body['name'],
            ':description' => $body['description'] ?? null,
            ':cover_image' => $body['cover_image'] ?? null,
            ':sort_order' => (int)($body['sort_order'] ?? 0),
            ':is_active' => (int)($body['is_active'] ?? 1),
        ]);
        $newId = $pdo->lastInsertId();
        $stmt = $pdo->prepare('SELECT *, 0 as item_count FROM gallery_folders WHERE id = ?');
        $stmt->execute([$newId]);
        $row = $stmt->fetch();
        $row['cover_url'] = file_url($row['cover_image']);
        respond($row, 201);
        break;

    case 'PUT':
        auth_check();
        $body = get_body();
        $id = $id ?? (int)($body['id'] ?? 0);
        if (!$id)
            respond(['error' => 'ID wajib disertakan'], 400);

        $stmt = $pdo->prepare(
            'UPDATE gallery_folders SET name=:name, description=:description,
             cover_image=:cover_image, sort_order=:sort_order, is_active=:is_active
             WHERE id=:id'
        );
        $stmt->execute([
            ':name' => $body['name'],
            ':description' => $body['description'] ?? null,
            ':cover_image' => $body['cover_image'] ?? null,
            ':sort_order' => (int)($body['sort_order'] ?? 0),
            ':is_active' => (int)($body['is_active'] ?? 1),
            ':id' => $id,
        ]);

        $stmt = $pdo->prepare(
            'SELECT f.*, COUNT(i.id) as item_count FROM gallery_folders f
             LEFT JOIN gallery_items i ON i.folder_id = f.id AND i.is_active = 1
             WHERE f.id = ? GROUP BY f.id'
        );
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        $row['cover_url'] = file_url($row['cover_image']);
        respond($row);
        break;

    case 'DELETE':
        auth_check();
        $body = get_body();
        $id = $id ?? (int)($body['id'] ?? 0);
        if (!$id)
            respond(['error' => 'ID wajib disertakan'], 400);

        // Pindahkan item ke tanpa folder (tidak dihapus)
        $pdo->prepare('UPDATE gallery_items SET folder_id = NULL WHERE folder_id = ?')->execute([$id]);
        $pdo->prepare('DELETE FROM gallery_folders WHERE id = ?')->execute([$id]);
        respond(['success' => true, 'message' => 'Folder dihapus, foto dipindah ke Tanpa Folder']);
        break;

    default:
        respond(['error' => 'Method tidak diizinkan'], 405);
}