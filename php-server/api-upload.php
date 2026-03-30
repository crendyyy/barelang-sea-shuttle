<?php
// ============================================================
// api-upload.php — File Upload Handler
// POST ?type=fleet|gallery
// Form field: file (multipart/form-data)
// ============================================================
require_once __DIR__ . '/db.php';
cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST')
    respond(['error' => 'Hanya POST yang diizinkan'], 405);

auth_check();

$type = $_GET['type'] ?? 'gallery';
if (!in_array($type, ['fleet', 'gallery']))
    respond(['error' => 'Type tidak valid. Gunakan: fleet atau gallery'], 400);

if (empty($_FILES['file']))
    respond(['error' => 'Field "file" tidak ditemukan'], 400);

$file  = $_FILES['file'];
$error = $file['error'];

if ($error !== UPLOAD_ERR_OK) {
    $msg = match($error) {
        UPLOAD_ERR_INI_SIZE   => 'File terlalu besar (batas php.ini)',
        UPLOAD_ERR_FORM_SIZE  => 'File terlalu besar (batas form)',
        UPLOAD_ERR_PARTIAL    => 'File hanya terupload sebagian',
        UPLOAD_ERR_NO_FILE    => 'Tidak ada file yang diupload',
        UPLOAD_ERR_NO_TMP_DIR => 'Folder temporary tidak ditemukan',
        UPLOAD_ERR_CANT_WRITE => 'Gagal menyimpan file',
        default               => 'Upload gagal (kode: ' . $error . ')',
    };
    respond(['error' => $msg], 400);
}

if ($file['size'] > MAX_UPLOAD_SIZE)
    respond(['error' => 'Ukuran file melebihi batas 10MB'], 400);

// Deteksi MIME type asli (bukan dari client)
$finfo    = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($file['tmp_name']);

$allowedAll = array_merge(ALLOWED_IMG_TYPES, ALLOWED_VID_TYPES);
if (!in_array($mimeType, $allowedAll))
    respond(['error' => 'Tipe file tidak diizinkan. Gunakan: JPG, PNG, WebP, GIF, MP4, WebM'], 400);

$fileType = in_array($mimeType, ALLOWED_VID_TYPES) ? 'video' : 'image';

// Buat subfolder jika belum ada
$destDir = UPLOAD_DIR . $type . '/';
if (!is_dir($destDir)) mkdir($destDir, 0755, true);

$safeFilename = safe_filename($file['name']);
$destPath     = $destDir . $safeFilename;
$relativePath = $type . '/' . $safeFilename;

if (!move_uploaded_file($file['tmp_name'], $destPath))
    respond(['error' => 'Gagal menyimpan file ke server'], 500);

respond([
    'success'   => true,
    'file_path' => $relativePath,        // disimpan ke DB
    'file_name' => $file['name'],        // nama asli
    'file_url'  => file_url($relativePath), // URL publik untuk preview
    'file_type' => $fileType,
    'file_size' => $file['size'],
    'mime_type' => $mimeType,
]);
