<?php
// ============================================================
// api-contact.php — Kontak Settings
// GET → semua settings (public)
// PUT → update settings (admin)
// ============================================================
require_once __DIR__ . '/db.php';
cors();

$method = $_SERVER['REQUEST_METHOD'];

$allowed = [
    'whatsapp_number', 'whatsapp_display', 'phone',
    'email', 'address',
    'instagram_handle', 'instagram_url',
    'facebook_name', 'facebook_url',
    'tiktok_handle', 'tiktok_url',
    'youtube_name', 'youtube_url',
];

switch ($method) {

    case 'GET':
        $stmt = $pdo->query('SELECT setting_key, setting_value FROM contact_settings');
        $rows = $stmt->fetchAll();
        $out = [];
        foreach ($rows as $r)
            $out[$r['setting_key']] = $r['setting_value'];
        respond($out);
        break;

    case 'PUT':
        auth_check();
        $body = get_body();

        $stmt = $pdo->prepare(
            'INSERT INTO contact_settings (setting_key, setting_value)
             VALUES (:key, :val)
             ON DUPLICATE KEY UPDATE setting_value = :val2'
        );
        foreach ($allowed as $key) {
            if (isset($body[$key])) {
                $stmt->execute([':key' => $key, ':val' => $body[$key], ':val2' => $body[$key]]);
            }
        }

        // Return updated
        $stmt = $pdo->query('SELECT setting_key, setting_value FROM contact_settings');
        $rows = $stmt->fetchAll();
        $out = [];
        foreach ($rows as $r)
            $out[$r['setting_key']] = $r['setting_value'];
        respond($out);
        break;

    default:
        respond(['error' => 'Method tidak diizinkan'], 405);
}
