<?php
// ============================================================
// api-services-crud.php — Admin CRUD: layanan
// ============================================================
require_once __DIR__ . '/db.php';
cors();

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($method) {

    case 'GET':
        auth_check();
        if ($id) {
            $stmt = $pdo->prepare('SELECT * FROM services WHERE id = ?');
            $stmt->execute([$id]);
            $row = $stmt->fetch();
            if (!$row) respond(['error' => 'Data tidak ditemukan'], 404);
            $row['features'] = json_decode($row['features'] ?? '[]');
            respond($row);
        }
        $stmt = $pdo->query('SELECT * FROM services ORDER BY sort_order ASC, id ASC');
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            $r['features']     = json_decode($r['features'] ?? '[]');
            $r['is_highlight'] = (bool)$r['is_highlight'];
            $r['is_active']    = (bool)$r['is_active'];
        }
        respond($rows);
        break;

    case 'POST':
        auth_check();
        $body = get_body();
        if (empty($body['title'])) respond(['error' => "Field 'title' wajib diisi"], 400);

        $features = is_array($body['features'] ?? null)
            ? json_encode($body['features'], JSON_UNESCAPED_UNICODE)
            : ($body['features'] ?? '[]');

        $stmt = $pdo->prepare(
            'INSERT INTO services (title, description, features, icon_name, is_highlight, sort_order, is_active)
             VALUES (:title, :description, :features, :icon_name, :is_highlight, :sort_order, :is_active)'
        );
        $stmt->execute([
            ':title'        => $body['title'],
            ':description'  => $body['description']  ?? null,
            ':features'     => $features,
            ':icon_name'    => $body['icon_name']     ?? null,
            ':is_highlight' => (int)($body['is_highlight'] ?? 0),
            ':sort_order'   => (int)($body['sort_order']   ?? 0),
            ':is_active'    => (int)($body['is_active']    ?? 1),
        ]);
        $newId = $pdo->lastInsertId();
        $stmt  = $pdo->prepare('SELECT * FROM services WHERE id = ?');
        $stmt->execute([$newId]);
        $row = $stmt->fetch();
        $row['features'] = json_decode($row['features'] ?? '[]');
        respond($row, 201);
        break;

    case 'PUT':
        auth_check();
        $body = get_body();
        $id   = $id ?? (int)($body['id'] ?? 0);
        if (!$id) respond(['error' => 'ID wajib disertakan'], 400);
        if (empty($body['title'])) respond(['error' => "Field 'title' wajib diisi"], 400);

        $features = is_array($body['features'] ?? null)
            ? json_encode($body['features'], JSON_UNESCAPED_UNICODE)
            : ($body['features'] ?? '[]');

        $stmt = $pdo->prepare(
            'UPDATE services SET title=:title, description=:description, features=:features,
             icon_name=:icon_name, is_highlight=:is_highlight, sort_order=:sort_order, is_active=:is_active
             WHERE id=:id'
        );
        $stmt->execute([
            ':title'        => $body['title'],
            ':description'  => $body['description']  ?? null,
            ':features'     => $features,
            ':icon_name'    => $body['icon_name']     ?? null,
            ':is_highlight' => (int)($body['is_highlight'] ?? 0),
            ':sort_order'   => (int)($body['sort_order']   ?? 0),
            ':is_active'    => (int)($body['is_active']    ?? 1),
            ':id'           => $id,
        ]);
        $stmt = $pdo->prepare('SELECT * FROM services WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        $row['features'] = json_decode($row['features'] ?? '[]');
        respond($row);
        break;

    case 'DELETE':
        auth_check();
        $body = get_body();
        $id   = $id ?? (int)($body['id'] ?? 0);
        if (!$id) respond(['error' => 'ID wajib disertakan'], 400);
        $pdo->prepare('DELETE FROM services WHERE id = ?')->execute([$id]);
        respond(['success' => true, 'message' => 'Layanan berhasil dihapus']);
        break;

    default:
        respond(['error' => 'Method tidak diizinkan'], 405);
}
