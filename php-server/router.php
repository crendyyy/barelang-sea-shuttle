<?php
// ============================================================
// router.php — PHP Built-in Server Router
//
// Jalankan dengan:
//   cd php-server
//   php -S localhost:8000 router.php
//
// Atau dari root project:
//   php -S localhost:8000 -t php-server php-server/router.php
// ============================================================

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve file statis (foto/video dari folder uploads/) langsung
if (preg_match('/^\/uploads\//', $uri)) {
    $filePath = __DIR__ . $uri;
    if (file_exists($filePath) && is_file($filePath)) {
        // Set CORS header agar frontend bisa load gambar
        header('Access-Control-Allow-Origin: *');

        $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $mimeMap = [
            'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg',
            'png' => 'image/png', 'webp' => 'image/webp',
            'gif' => 'image/gif', 'mp4' => 'video/mp4',
            'webm' => 'video/webm',
        ];
        header('Content-Type: ' . ($mimeMap[$ext] ?? 'application/octet-stream'));
        header('Content-Length: ' . filesize($filePath));
        header('Cache-Control: public, max-age=86400'); // cache 1 hari
        readfile($filePath);
        return true;
    }
    http_response_code(404);
    echo json_encode(['error' => 'File not found']);
    return true;
}

// Untuk file PHP — biarkan built-in server handle sendiri
return false;
