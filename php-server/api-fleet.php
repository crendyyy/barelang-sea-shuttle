<?php
// ============================================================
// api-fleet.php — Public: GET armada kapal
// GET /api-fleet.php          → semua kapal aktif
// GET /api-fleet.php?id=1     → satu kapal
// ============================================================
require_once __DIR__ . '/db.php';
cors();

if ($_SERVER['REQUEST_METHOD'] !== 'GET')
    respond(['error' => 'Method tidak diizinkan'], 405);

$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($id) {
    $stmt = $pdo->prepare('SELECT * FROM fleet WHERE id = ? AND is_active = 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) respond(['error' => 'Kapal tidak ditemukan'], 404);
    $row['features']  = json_decode($row['features'] ?? '[]');
    $row['image_url'] = file_url($row['image_path']);
    respond($row);
}

$stmt = $pdo->query('SELECT * FROM fleet WHERE is_active = 1 ORDER BY sort_order ASC, id ASC');
$rows = $stmt->fetchAll();
foreach ($rows as &$r) {
    $r['features']  = json_decode($r['features'] ?? '[]');
    $r['image_url'] = file_url($r['image_path']);
}
respond($rows);
