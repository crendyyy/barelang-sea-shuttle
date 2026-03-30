<?php
// ============================================================
// login.php — Admin Authentication
// POST  → login, return token
// GET   → verify token
// DELETE→ logout
// ============================================================
require_once __DIR__ . '/db.php';
cors();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // ── LOGIN ────────────────────────────────────────────────
    case 'POST':
        $body = get_body();
        $username = trim($body['username'] ?? '');
        $password = trim($body['password'] ?? '');

        if (!$username || !$password)
            respond(['error' => 'Username dan password wajib diisi'], 400);

        $stmt = $pdo->prepare('SELECT * FROM admin_users WHERE username = ? LIMIT 1');
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password']))
            respond(['error' => 'Username atau password salah'], 401);

        // Hapus token lama
        $pdo->prepare('DELETE FROM auth_tokens WHERE user_id = ?')->execute([$user['id']]);

        // Buat token baru (expire 8 jam)
        $token = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', time() + 8 * 36000);

        $pdo->prepare(
            'INSERT INTO auth_tokens (user_id, token, expires_at) VALUES (?, ?, ?)'
        )->execute([$user['id'], $token, $expiresAt]);

        respond([
            'success' => true,
            'token' => $token,
            'expires_at' => $expiresAt,
            'username' => $user['username'],
        ]);
        break;

    // ── VERIFY ──────────────────────────────────────────────
    case 'GET':
        $user = auth_check();
        respond(['success' => true, 'username' => $user['username']]);
        break;

    // ── LOGOUT ──────────────────────────────────────────────
    case 'DELETE':
        $user = auth_check();
        $pdo->prepare('DELETE FROM auth_tokens WHERE user_id = ?')->execute([$user['user_id']]);
        respond(['success' => true, 'message' => 'Logout berhasil']);
        break;

    default:
        respond(['error' => 'Method tidak diizinkan'], 405);
}
