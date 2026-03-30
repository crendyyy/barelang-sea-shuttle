-- ============================================================
-- Rental Boat Batam — Database Setup
-- Import via: phpMyAdmin → Import → pilih file ini
-- Atau CLI: mysql -u root -p < database.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS `rental_boat_batam`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `rental_boat_batam`;

-- ============================================================
-- ADMIN USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `username`   VARCHAR(100) NOT NULL UNIQUE,
  `password`   VARCHAR(255) NOT NULL COMMENT 'bcrypt hash',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Username: admin | Password: admin123
-- GANTI PASSWORD INI setelah login pertama!
INSERT IGNORE INTO `admin_users` (`username`, `password`) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- ============================================================
-- AUTH TOKENS
-- ============================================================
CREATE TABLE IF NOT EXISTS `auth_tokens` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `user_id`    INT NOT NULL,
  `token`      VARCHAR(64) NOT NULL UNIQUE,
  `expires_at` DATETIME NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `admin_users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- FLEET (Armada Kapal)
-- ============================================================
CREATE TABLE IF NOT EXISTS `fleet` (
  `id`             INT AUTO_INCREMENT PRIMARY KEY,
  `name`           VARCHAR(255) NOT NULL,
  `capacity`       VARCHAR(100),
  `price`          VARCHAR(100),
  `price_per_mile` VARCHAR(100),
  `description`    TEXT,
  `features`       JSON,
  `image_path`     VARCHAR(500) COMMENT 'relative path under uploads/fleet/',
  `sort_order`     INT DEFAULT 0,
  `is_active`      TINYINT(1) DEFAULT 1,
  `created_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT IGNORE INTO `fleet` (`id`, `name`, `capacity`, `price`, `price_per_mile`, `description`, `features`, `sort_order`) VALUES
(1, 'Crew Boat',   '15 orang',     'Rp 800.000 - 1.800.000', 'Rp 400-600rb/mil',
 'Kapal crew untuk berbagai ukuran grup, dari 7 hingga 24 orang.',
 '["Variasi ukuran","Nyaman & Stabil","Cocok untuk grup","Fleksibel"]', 1),

(2, 'Boat Pancung', '7-24 orang',  'Rp 1.500.000',           'Rp 200-350rb/mil',
 'Kapal cepat untuk perjalanan grup sedang, cocok untuk wisata dan mancing.',
 '["Cepat & Stabil","Cocok untuk Wisata","Nyaman","Kapasitas 15 orang"]', 2),

(3, 'Pompong',      'Angkut barang', 'Hubungi Kami',          'Rp 300-500rb/mil',
 'Khusus untuk pengangkutan barang dan logistik laut.',
 '["Angkut Barang","Kapasitas Besar","Andal","Logistik laut"]', 3);

-- ============================================================
-- SERVICES (Layanan)
-- ============================================================
CREATE TABLE IF NOT EXISTS `services` (
  `id`           INT AUTO_INCREMENT PRIMARY KEY,
  `title`        VARCHAR(255) NOT NULL,
  `description`  TEXT,
  `features`     JSON,
  `icon_name`    VARCHAR(100) COMMENT 'Lucide icon name e.g. Fish, Waves',
  `is_highlight` TINYINT(1) DEFAULT 0,
  `sort_order`   INT DEFAULT 0,
  `is_active`    TINYINT(1) DEFAULT 1,
  `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT IGNORE INTO `services` (`id`, `title`, `description`, `features`, `icon_name`, `is_highlight`, `sort_order`) VALUES
(1, 'Trip Mancing',
 'Layanan paling populer! Nikmati pengalaman mancing di spot-spot terbaik perairan Batam.',
 '["Spot mancing terbaik","Peralatan lengkap tersedia","Guide berpengalaman","Konsumsi & es tersedia"]',
 'Fish', 1, 1),

(2, 'Jasa Nyelam',
 'Servis bawah kapal, pembersihan, dan kebutuhan penyelaman lainnya dengan tim profesional.',
 '["Tim penyelam profesional","Peralatan diving lengkap","Servis bawah kapal","Dokumentasi underwater"]',
 'Waves', 0, 2),

(3, 'Wisata Barelang',
 'Jelajahi keindahan pulau-pulau sekitar Barelang dengan kapal kami yang nyaman.',
 '["Rute wisata menarik","Kapal nyaman & aman","Foto spot instagramable","Snorkeling equipment"]',
 'Palmtree', 0, 3),

(4, 'Angkut Barang',
 'Layanan logistik laut untuk pengiriman barang antar pulau dengan aman.',
 '["Pengiriman antar pulau","Tracking real-time","Asuransi barang","Handling profesional"]',
 'Package', 0, 4),

(5, 'Cleaning Kapal',
 'Jasa pembersihan kapal di tengah laut dengan peralatan dan tim yang berpengalaman.',
 '["Pembersihan menyeluruh","Peralatan modern","Tim berpengalaman","Hasil maksimal terjamin"]',
 'Sparkles', 0, 5),

(6, 'Sewa Harian',
 'Sewa kapal per hari (8 jam) untuk berbagai kebutuhan sesuai keinginan Anda.',
 '["Sewa 8 jam penuh","Fleksibel sesuai kebutuhan","BBM included","Crew profesional"]',
 'Clock', 0, 6);

-- ============================================================
-- CONTACT SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS `contact_settings` (
  `id`            INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key`   VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` TEXT,
  `updated_at`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT IGNORE INTO `contact_settings` (`setting_key`, `setting_value`) VALUES
('whatsapp_number',  '6281534475202'),
('whatsapp_display', '081534475202'),
('phone',            '081534475202'),
('email',            'rentalboatbatam@gmail.com'),
('address',          'Tanjung Riau, Barelang & Punggur, Batam'),
('instagram_handle', '@rentalboatbatam'),
('instagram_url',    'https://instagram.com/rentalboatbatam'),
('facebook_name',    'Rental Boat Batam'),
('facebook_url',     'https://facebook.com/rentalboatbatam');

-- ============================================================
-- GALLERY FOLDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS `gallery_folders` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `name`        VARCHAR(255) NOT NULL,
  `description` TEXT,
  `cover_image` VARCHAR(500) COMMENT 'relative path, dipakai sebagai thumbnail folder',
  `sort_order`  INT DEFAULT 0,
  `is_active`   TINYINT(1) DEFAULT 1,
  `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT IGNORE INTO `gallery_folders` (`id`, `name`, `description`, `sort_order`) VALUES
(1, 'Armada Kapal',   'Foto-foto armada kapal kami',       1),
(2, 'Trip Mancing',   'Dokumentasi perjalanan mancing',    2),
(3, 'Wisata Barelang','Foto wisata pulau-pulau Barelang',  3),
(4, 'Umum',           'Foto-foto kegiatan lainnya',        4);

-- ============================================================
-- GALLERY ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS `gallery_items` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `folder_id`   INT DEFAULT NULL,
  `title`       VARCHAR(255),
  `file_path`   VARCHAR(500) NOT NULL COMMENT 'relative path under uploads/gallery/',
  `file_name`   VARCHAR(255) NOT NULL,
  `file_type`   ENUM('image','video') DEFAULT 'image',
  `file_size`   INT UNSIGNED COMMENT 'ukuran dalam bytes',
  `sort_order`  INT DEFAULT 0,
  `is_active`   TINYINT(1) DEFAULT 1,
  `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`folder_id`) REFERENCES `gallery_folders`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;
