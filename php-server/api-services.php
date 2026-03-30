<?php
// ============================================================
// api-services.php — Public: GET layanan
// ============================================================
require_once __DIR__ . '/db.php';
cors();

if ($_SERVER['REQUEST_METHOD'] !== 'GET')
    respond(['error' => 'Method tidak diizinkan'], 405);

$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($id) {
    $stmt = $pdo->prepare('SELECT * FROM services WHERE id = ? AND is_active = 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) respond(['error' => 'Layanan tidak ditemukan'], 404);
    $row['features']     = json_decode($row['features'] ?? '[]');
    $row['is_highlight'] = (bool)$row['is_highlight'];
    respond($row);
}

$stmt = $pdo->query('SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC');
$rows = $stmt->fetchAll();
foreach ($rows as &$r) {
    $r['features']     = json_decode($r['features'] ?? '[]');
    $r['is_highlight'] = (bool)$r['is_highlight'];
    $r['is_active']    = (bool)$r['is_active'];
}
respond($rows);
