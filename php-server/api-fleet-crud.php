<?php
// ============================================================
// api-fleet-crud.php — Admin CRUD: armada kapal
// GET    ?id=      → semua / satu (include non-aktif)
// POST             → create
// PUT              → update (?id= di body atau query)
// DELETE           → delete (?id= di body)
// ============================================================
require_once __DIR__ . '/db.php';
cors();

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($method) {

    case 'GET':
        auth_check();
        if ($id) {
            $stmt = $pdo->prepare('SELECT * FROM fleet WHERE id = ?');
            $stmt->execute([$id]);
            $row = $stmt->fetch();
            if (!$row) respond(['error' => 'Data tidak ditemukan'], 404);
            $row['features']  = json_decode($row['features'] ?? '[]');
            $row['image_url'] = file_url($row['image_path']);
            respond($row);
        }
        $stmt = $pdo->query('SELECT * FROM fleet ORDER BY sort_order ASC, id ASC');
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            $r['features']  = json_decode($r['features'] ?? '[]');
            $r['image_url'] = file_url($r['image_path']);
        }
        respond($rows);
        break;

    case 'POST':
        auth_check();
        $body = get_body();
        if (empty($body['name'])) respond(['error' => "Field 'name' wajib diisi"], 400);

        $features = is_array($body['features'] ?? null)
            ? json_encode($body['features'], JSON_UNESCAPED_UNICODE)
            : ($body['features'] ?? '[]');

        $stmt = $pdo->prepare(
            'INSERT INTO fleet (name, capacity, price, price_per_mile, description, features, image_path, sort_order, is_active)
             VALUES (:name, :capacity, :price, :price_per_mile, :description, :features, :image_path, :sort_order, :is_active)'
        );
        $stmt->execute([
            ':name'           => $body['name'],
            ':capacity'       => $body['capacity']       ?? null,
            ':price'          => $body['price']          ?? null,
            ':price_per_mile' => $body['price_per_mile'] ?? null,
            ':description'    => $body['description']    ?? null,
            ':features'       => $features,
            ':image_path'     => $body['image_path']     ?? null,
            ':sort_order'     => (int)($body['sort_order'] ?? 0),
            ':is_active'      => (int)($body['is_active']  ?? 1),
        ]);
        $newId = $pdo->lastInsertId();
        $stmt  = $pdo->prepare('SELECT * FROM fleet WHERE id = ?');
        $stmt->execute([$newId]);
        $row = $stmt->fetch();
        $row['features']  = json_decode($row['features'] ?? '[]');
        $row['image_url'] = file_url($row['image_path']);
        respond($row, 201);
        break;

    case 'PUT':
        auth_check();
        $body = get_body();
        $id   = $id ?? (int)($body['id'] ?? 0);
        if (!$id) respond(['error' => 'ID wajib disertakan'], 400);
        if (empty($body['name'])) respond(['error' => "Field 'name' wajib diisi"], 400);

        $features = is_array($body['features'] ?? null)
            ? json_encode($body['features'], JSON_UNESCAPED_UNICODE)
            : ($body['features'] ?? '[]');

        $stmt = $pdo->prepare(
            'UPDATE fleet SET name=:name, capacity=:capacity, price=:price,
             price_per_mile=:price_per_mile, description=:description, features=:features,
             image_path=:image_path, sort_order=:sort_order, is_active=:is_active
             WHERE id=:id'
        );
        $stmt->execute([
            ':name'           => $body['name'],
            ':capacity'       => $body['capacity']       ?? null,
            ':price'          => $body['price']          ?? null,
            ':price_per_mile' => $body['price_per_mile'] ?? null,
            ':description'    => $body['description']    ?? null,
            ':features'       => $features,
            ':image_path'     => $body['image_path']     ?? null,
            ':sort_order'     => (int)($body['sort_order'] ?? 0),
            ':is_active'      => (int)($body['is_active']  ?? 1),
            ':id'             => $id,
        ]);
        $stmt = $pdo->prepare('SELECT * FROM fleet WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        $row['features']  = json_decode($row['features'] ?? '[]');
        $row['image_url'] = file_url($row['image_path']);
        respond($row);
        break;

    case 'DELETE':
        auth_check();
        $body = get_body();
        $id   = $id ?? (int)($body['id'] ?? 0);
        if (!$id) respond(['error' => 'ID wajib disertakan'], 400);

        // Hapus file gambar jika ada
        $stmt = $pdo->prepare('SELECT image_path FROM fleet WHERE id = ?');
        $stmt->execute([$id]);
        $row  = $stmt->fetch();
        if ($row && $row['image_path']) {
            $file = UPLOAD_DIR . $row['image_path'];
            if (file_exists($file)) unlink($file);
        }
        $pdo->prepare('DELETE FROM fleet WHERE id = ?')->execute([$id]);
        respond(['success' => true, 'message' => 'Kapal berhasil dihapus']);
        break;

    default:
        respond(['error' => 'Method tidak diizinkan'], 405);
}
