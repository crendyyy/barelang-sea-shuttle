<?php
// ============================================================
// db.php — Konfigurasi Database
// Sesuaikan dengan environment Anda
// ============================================================

// Load .env jika ada
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (str_starts_with(trim($line), '#') || !str_contains($line, '='))
            continue;
        [$key, $val] = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($val);
    }
}

define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_NAME', $_ENV['DB_NAME'] ?? 'rental_boat_batam');
define('DB_USER', $_ENV['DB_USER'] ?? 'root');
define('DB_PASS', $_ENV['DB_PASS'] ?? '');
define('DB_CHARSET', 'utf8mb4');

// URL base untuk construct URL file upload
// Development: http://localhost:8000
// Production:  https://yourdomain.com/php-server
define('BASE_URL', $_ENV['BASE_URL'] ?? 'http://localhost:8000');

// Folder uploads (relatif terhadap file ini)
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('UPLOAD_URL', BASE_URL . '/uploads/');

// Batas upload
define('MAX_UPLOAD_SIZE', 10 * 1024 * 1024); // 10 MB
define('ALLOWED_IMG_TYPES', ['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
define('ALLOWED_VID_TYPES', ['video/mp4', 'video/webm']);

// ── PDO Connection ────────────────────────────────────────
try {
    $pdo = new PDO(
        sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET),
        DB_USER, DB_PASS,
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
        );
}
catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'DB connection failed: ' . $e->getMessage()]);
    exit;
}

// ── Helper Functions ──────────────────────────────────────

/** Set CORS headers & handle OPTIONS preflight */
function cors(): void
{
    // Karena FE dan BE satu domain, cukup set ini:
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

/** Kirim JSON response dan exit */
function respond(mixed $data, int $code = 200): void
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Ambil request body JSON */
function get_body(): array
{
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

/** Validasi Bearer token, return user data atau 401 */
function auth_check(): array
{
    global $pdo;
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    $token = trim(str_replace('Bearer', '', $authHeader));

    if (empty($token))
        respond(['error' => 'Token tidak ditemukan'], 401);

    $stmt = $pdo->prepare(
        'SELECT at.*, au.username FROM auth_tokens at
         JOIN admin_users au ON au.id = at.user_id
         WHERE at.token = ? AND at.expires_at > NOW()'
    );
    $stmt->execute([$token]);
    $row = $stmt->fetch();

    if (!$row)
        respond(['error' => 'Token tidak valid atau sudah expired'], 401);
    return $row;
}

/** Construct public URL dari relative path */
function file_url(?string $path): ?string
{
    if (empty($path))
        return null;
    return UPLOAD_URL . ltrim($path, '/');
}

/** Generate unique safe filename */
function safe_filename(string $original): string
{
    $ext = strtolower(pathinfo($original, PATHINFO_EXTENSION));
    $name = pathinfo($original, PATHINFO_FILENAME);
    $name = preg_replace('/[^a-zA-Z0-9_-]/', '_', $name);
    return uniqid(substr($name, 0, 20) . '_', true) . '.' . $ext;
}
