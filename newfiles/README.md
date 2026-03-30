# 🚤 Rental Boat Batam — Setup Guide

## Struktur Folder (setelah digabung)

```
sisgadai-nextgen-07598/          ← root project Anda
├── php-server/                  ← semua PHP flat di sini
│   ├── .env                     ← ⚠️ buat dari .env.example
│   ├── .env.example
│   ├── router.php               ← wajib untuk php -S
│   ├── db.php                   ← config + helper functions
│   ├── database.sql             ← import ke MySQL
│   │
│   ├── login.php                ← auth (POST/GET/DELETE)
│   ├── api-fleet.php            ← public GET kapal
│   ├── api-fleet-crud.php       ← admin CRUD kapal
│   ├── api-services.php         ← public GET layanan
│   ├── api-services-crud.php    ← admin CRUD layanan
│   ├── api-contact.php          ← GET + PUT kontak
│   ├── api-gallery-folders.php  ← GET + admin CRUD folders
│   ├── api-gallery-items.php    ← GET + admin CRUD items
│   ├── api-upload.php           ← upload foto/video
│   │
│   ├── uploads/                 ← foto disimpan di sini (bukan di DB)
│   │   ├── fleet/
│   │   └── gallery/
│   │
│   └── (file PHP lama Anda tidak terganggu)
│
└── src/
    ├── lib/api.ts               ← semua API exports
    └── pages/
        ├── Admin.tsx            ← login + sidebar layout
        └── admin/
            ├── AdminComponents.tsx
            ├── FleetAdmin.tsx
            ├── ServicesAdmin.tsx
            ├── ContactAdmin.tsx
            └── GalleryAdmin.tsx
```

---

## 1. Setup (3 langkah)

### Langkah 1 — Salin file

Copy isi `php-server/` baru ke `php-server/` project Anda.
Copy isi `src/` ke `src/` project Anda.

> `db.php` yang baru **aman untuk ditaruh berdampingan** dengan `db.php` lama Anda.
> Keduanya bisa ada sekaligus — file PHP baru hanya `require_once 'db.php'` milik sendiri.
> Jika Anda ingin merge, cukup tambahkan fungsi-fungsi baru (`cors`, `respond`, dll)
> ke `db.php` lama Anda yang sudah ada.

### Langkah 2 — Import database

```bash
# Via CLI
mysql -u root -p < php-server/database.sql

# Atau phpMyAdmin → Import → pilih database.sql
```

### Langkah 3 — Buat `.env`

```bash
cp php-server/.env.example php-server/.env
```

Edit `php-server/.env`:
```env
DB_HOST=localhost
DB_NAME=rental_boat_batam
DB_USER=root
DB_PASS=           # ← isi password MySQL Anda
BASE_URL=http://localhost:8000
```

---

## 2. Menjalankan

```bash
# Dari root project (cara yang direkomendasikan)
php -S localhost:8000 -t php-server php-server/router.php

# Atau masuk ke folder php-server
cd php-server
php -S localhost:8000 router.php
```

> **Kenapa perlu `router.php`?**
> PHP built-in server tidak otomatis serve static files dari subfolder.
> `router.php` menangani request ke `/uploads/...` agar foto/video bisa tampil.

Jalankan frontend seperti biasa:
```bash
npm run dev
```

---

## 3. Login Admin

Akses: `http://localhost:5173/admin`

| Username | Password   |
|----------|------------|
| `admin`  | `admin123` |

**Ganti password** setelah login pertama:
```bash
# Generate hash baru
php -r "echo password_hash('password_baru', PASSWORD_DEFAULT);"
```
```sql
UPDATE admin_users SET password = 'HASH_HASIL_DI_ATAS' WHERE username = 'admin';
```

---

## 4. Endpoint Summary

| File                       | Method              | Butuh Auth |
|----------------------------|---------------------|------------|
| `login.php`                | POST/GET/DELETE     | GET & DELETE ✓ |
| `api-fleet.php`            | GET                 | ✗ (publik) |
| `api-fleet-crud.php`       | GET/POST/PUT/DELETE | ✓          |
| `api-services.php`         | GET                 | ✗ (publik) |
| `api-services-crud.php`    | GET/POST/PUT/DELETE | ✓          |
| `api-contact.php`          | GET                 | ✗ (publik) |
| `api-contact.php`          | PUT                 | ✓          |
| `api-gallery-folders.php`  | GET/POST/PUT/DELETE | GET ✗, lainnya ✓ |
| `api-gallery-items.php`    | GET/POST/PUT/DELETE | GET ✗, lainnya ✓ |
| `api-upload.php`           | POST `?type=fleet\|gallery` | ✓ |

---

## 5. Menggunakan `api.ts` di Frontend

File `src/lib/api.ts` sudah berisi semua export lama + export baru.
Import sesuai kebutuhan:

```typescript
import { fleetAPI, servicesAPI, contactAPI } from "@/lib/api";

// Public: ambil data kapal untuk FleetSection
const res = await fleetAPI.getAll();
const boats = res.data; // sudah filter is_active = 1

// Public: ambil layanan untuk ServicesSection
const { data: services } = await servicesAPI.getAll();

// Public: ambil kontak untuk ContactSection
const { data: contact } = await contactAPI.getAll();
// contact.whatsapp_number, contact.email, dst.
```

---

## 6. Tips

**.gitignore** — tambahkan agar foto tidak ikut ke Git:
```
php-server/uploads/fleet/*
php-server/uploads/gallery/*
!php-server/uploads/fleet/.gitkeep
!php-server/uploads/gallery/.gitkeep
```

**Production** — ganti `BASE_URL` di `.env`:
```env
BASE_URL=https://yourdomain.com/php-server
```
Dan sesuaikan CORS di `db.php` fungsi `cors()` dari `*` ke domain frontend Anda.
