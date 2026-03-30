<?php
// ============================================================
// api-gallery-items.php — Gallery Items
// GET    ?folder_id=N  → items by folder (0 = tanpa folder, kosong = semua)
// GET    ?id=N         → satu item
// POST                 → create item (simpan metadata setelah upload)
// PUT    ?id=N         → update (judul, folder, dll)
// PUT    (body.ids[])  → bulk move ke folder lain
// DELETE ?id=N / body  → hapus item + file
// ============================================================
require_once __DIR__ . '/db.php';
cors();

$method   = $_SERVER['REQUEST_METHOD'];
$id       = isset($_GET['id'])        ? (int)$_GET['id']        : null;
$folderId = isset($_GET['folder_id']) ? (int)$_GET['folder_id'] : null;

switch ($method) {

    case 'GET':
        if ($id) {
            $stmt = $pdo->prepare('SELECT * FROM gallery_items WHERE id = ?');
            $stmt->execute([$id]);
            $row = $stmt->fetch();
            if (!$row) respond(['error' => 'Item tidak ditemukan'], 404);
            $row['file_url'] = file_url($row['file_path']);
            respond($row);
        }

        // Filter by folder
        if ($folderId !== null) {
            if ($folderId === 0) {
                // Tanpa folder
                $stmt = $pdo->query(
                    'SELECT * FROM gallery_items WHERE folder_id IS NULL AND is_active = 1
                     ORDER BY sort_order ASC, id ASC'
                );
            } else {
                $stmt = $pdo->prepare(
                    'SELECT * FROM gallery_items WHERE folder_id = ? AND is_active = 1
                     ORDER BY sort_order ASC, id ASC'
                );
                $stmt->execute([$folderId]);
            }
        } else {
            // Semua item (admin: tanpa filter is_active jika ada ?all)
            $activeOnly = !isset($_GET['all']);
            $sql = 'SELECT gi.*, gf.name as folder_name
                    FROM gallery_items gi
                    LEFT JOIN gallery_folders gf ON gf.id = gi.folder_id'
                 . ($activeOnly ? ' WHERE gi.is_active = 1' : '')
                 . ' ORDER BY gi.folder_id ASC, gi.sort_order ASC, gi.id ASC';
            $stmt = $pdo->query($sql);
        }

        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) $r['file_url'] = file_url($r['file_path']);
        respond($rows);
        break;

    case 'POST':
        auth_check();
        $body = get_body();
        if (empty($body['file_path']) || empty($body['file_name']))
            respond(['error' => 'file_path dan file_name wajib diisi'], 400);

        $stmt = $pdo->prepare(
            'INSERT INTO gallery_items (folder_id, title, file_path, file_name, file_type, file_size, sort_order, is_active)
             VALUES (:folder_id, :title, :file_path, :file_name, :file_type, :file_size, :sort_order, :is_active)'
        );
        $stmt->execute([
            ':folder_id'  => !empty($body['folder_id']) ? (int)$body['folder_id'] : null,
            ':title'      => $body['title']     ?? null,
            ':file_path'  => $body['file_path'],
            ':file_name'  => $body['file_name'],
            ':file_type'  => $body['file_type'] ?? 'image',
            ':file_size'  => $body['file_size'] ?? null,
            ':sort_order' => (int)($body['sort_order'] ?? 0),
            ':is_active'  => (int)($body['is_active']  ?? 1),
        ]);
        $newId = $pdo->lastInsertId();
        $stmt  = $pdo->prepare('SELECT * FROM gallery_items WHERE id = ?');
        $stmt->execute([$newId]);
        $row = $stmt->fetch();
        $row['file_url'] = file_url($row['file_path']);
        respond($row, 201);
        break;

    case 'PUT':
        auth_check();
        $body = get_body();

        // Bulk move: { ids: [1,2,3], folder_id: N }
        if (isset($body['ids']) && is_array($body['ids']) && !empty($body['ids'])) {
            $ids          = array_map('intval', $body['ids']);
            $targetFolder = !empty($body['folder_id']) ? (int)$body['folder_id'] : null;
            $placeholders = implode(',', array_fill(0, count($ids), '?'));

            if ($targetFolder !== null) {
                $params = array_merge([$targetFolder], $ids);
                $pdo->prepare("UPDATE gallery_items SET folder_id = ? WHERE id IN ($placeholders)")
                    ->execute($params);
            } else {
                $pdo->prepare("UPDATE gallery_items SET folder_id = NULL WHERE id IN ($placeholders)")
                    ->execute($ids);
            }
            respond(['success' => true, 'message' => count($ids) . ' item berhasil dipindah']);
        }

        // Single update
        $id = $id ?? (int)($body['id'] ?? 0);
        if (!$id) respond(['error' => 'ID wajib disertakan'], 400);

        $stmt = $pdo->prepare(
            'UPDATE gallery_items SET folder_id=:folder_id, title=:title,
             sort_order=:sort_order, is_active=:is_active WHERE id=:id'
        );
        $stmt->execute([
            ':folder_id'  => !empty($body['folder_id']) ? (int)$body['folder_id'] : null,
            ':title'      => $body['title']     ?? null,
            ':sort_order' => (int)($body['sort_order'] ?? 0),
            ':is_active'  => (int)($body['is_active']  ?? 1),
            ':id'         => $id,
        ]);

        $stmt = $pdo->prepare('SELECT * FROM gallery_items WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        $row['file_url'] = file_url($row['file_path']);
        respond($row);
        break;

    case 'DELETE':
        auth_check();
        $body = get_body();
        $id   = $id ?? (int)($body['id'] ?? 0);
        if (!$id) respond(['error' => 'ID wajib disertakan'], 400);

        $stmt = $pdo->prepare('SELECT file_path FROM gallery_items WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if ($row && $row['file_path']) {
            $file = UPLOAD_DIR . $row['file_path'];
            if (file_exists($file)) unlink($file);
        }
        $pdo->prepare('DELETE FROM gallery_items WHERE id = ?')->execute([$id]);
        respond(['success' => true, 'message' => 'Item berhasil dihapus']);
        break;

    default:
        respond(['error' => 'Method tidak diizinkan'], 405);
}
