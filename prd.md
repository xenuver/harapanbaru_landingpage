# Panduan Membangun Website: Sistem Informasi Desa Harapan Baru
## (Revisi: Best Practice Berdasarkan Skripsi Enterprise Architecture TOGAF ADM)

> **Stack yang Direkomendasikan:** Vite + Vanilla JavaScript (Modular) / React / Next.js
> **Deployment:** Vercel (CI/CD)
> **Arsitektur Data:** Terpisah dalam file JSON (Mewakili Phase C: Arsitektur Data)
> **Desain Sistem:** `ui-ux-pro-max` (Aksesibilitas Publik, Profesional, Tanpa Emoji)

---

## 1. Keselarasan dengan Skripsi TOGAF ADM

Sesuai dengan dokumen `SKRIPSI DENY YANG ASLI.docx`, pembangunan website ini bukanlah sekadar halaman statis biasa, melainkan perwujudan dari **Blueprint Enterprise Architecture**:
- **Phase B (Business Architecture):** Website harus mengakomodasi alur pelayanan (Use Case & Activity Diagram) seperti KTP, KK, Surat Pindah dengan portal layanan mandiri (Self-Service).
- **Phase C (Information System):**
  - *Data Architecture:* Struktur data entitas (Penduduk, Surat, Keuangan) yang diuraikan dalam *Class Diagram* harus disimulasikan menggunakan struktur file JSON terpisah yang terstruktur, bukan di-hardcode acak di HTML.
  - *Application Architecture:* Sistem harus dibangun secara modular (Component Diagram), memisahkan fungsi Kependudukan, Layanan Publik, dan Dashboard.
- **Phase D (Technology Architecture):** Skripsi merekomendasikan *Cloud Computing* dan keamanan berlapis (RBAC). Meskipun versi purwarupa (prototype) ini belum menggunakan backend penuh (PHP/Laravel), kita akan mendesain *frontend* agar **API-ready** (siap disambungkan ke backend sungguhan) dan di-deploy ke **Vercel** (Cloud).

---

## 2. Cara Terbaik Membangun Website Ini (Technical Approach)

Memasukkan seluruh kode (HTML, CSS, JS, Data) ke dalam **satu file tunggal (`index.html`)** seperti rencana awal adalah **anti-pattern** untuk arsitektur skala Enterprise. Skripsi Deny (Bagian Component Diagram) sangat menekankan **Modularitas**. 

Oleh karena itu, cara terbaik untuk membangun aplikasi ini adalah:

### A. Pendekatan Modular (Vite + Vanilla JS / Framework)
Jangan gunakan satu file `index.html`. Gunakan **Vite** sebagai *build tool* agar kita bisa memecah file menjadi komponen (Navbar, Footer, Card Layanan) dan halaman (Beranda, Profil, TOGAF). Ini sejalan dengan prinsip *Component Diagram* di skripsi.

### B. Simulasi Database (API-Ready)
Sesuai *Phase C: Arsitektur Data*, pisahkan data dari tampilan. Buat folder `data/` yang berisi file `layanan.json`, `statistik.json`, dan `tracker.json`. JavaScript akan melakukan `fetch()` ke file JSON tersebut seolah-olah sedang memanggil API sungguhan.

### C. Desain Publik Profesional (`ui-ux-pro-max`)
Sistem informasi pemerintah (E-Gov) menuntut standar tinggi.
- **Dilarang menggunakan Emoji sebagai ikon.** Gunakan ikon SVG (Lucide / Heroicons / FontAwesome).
- **Warna sesuai PRD awal:** Primary (`#1e3a5f`), Secondary (`#2e7d32`), Accent (`#f59e0b`).
- **Aksesibilitas:** Kontras tinggi, *focus states* yang jelas, navigasi ramah keyboard.

---

## 3. Struktur Direktori Proyek (Modular)

```text
desaharapan-landingpage/
│
├── index.html              # Entry point tunggal (SPA container)
├── data/                   # Representasi Phase C: Data Architecture
│   ├── penduduk.json
│   ├── layanan.json
│   └── tracker.json
├── css/                    # Representasi Style
│   ├── main.css
│   └── components.css
├── js/                     # Representasi Phase C: Application Architecture
│   ├── main.js             # Router / State Manager
│   ├── components.js       # Reusable UI (Navbar, Modal)
│   └── api.js              # Simulasi Fetch Data dari folder /data
└── vercel.json             # Konfigurasi deployment ke Vercel Cloud
```

---

## 4. Struktur Halaman (Single Page Application - SPA)

Aplikasi tetap terasa seperti satu kesatuan tanpa loading layar (SPA), namun kode di belakang layar terstruktur.

1. **Beranda (Home):** Hero CTA, Statistik Real-time (dari JSON), Visi Misi.
2. **Profil Desa:** Timeline Transformasi Digital, Dasar Hukum.
3. **Layanan Administrasi (Modul Inti Phase B):** 
   - 6 Kartu Layanan (KTP, KK, Akta Kelahiran, Surat Pindah, SKTM, Domisili).
   - Fitur Tracker Permohonan (Simulasi dari `tracker.json`).
4. **Struktur Organisasi:** Bagan hierarki Flexbox/Grid sesuai Skripsi BAB 3.
5. **Arsitektur Enterprise (TOGAF ADM):**
   - Rangkuman eksekutif dari Skripsi (Preliminary, Phase A, B, C, D).
6. **Permasalahan & Solusi:**
   - Accordion perbandingan *As-Is* vs *To-Be* sesuai Bab 4 skripsi.
7. **Kontak:** Peta lokasi dan form dummy.

---

## 5. Fitur Utama yang Harus Diimplementasikan (Sesuai Skripsi)

1. **Tracker Status Permohonan (Phase B & C):**
   - Warga dapat memasukkan nomor tiket (misal: `DHB-2026-001`).
   - Sistem melakukan *fetch* ke `tracker.json` dan menampilkan status secara *real-time* (simulasi).
2. **Portal Layanan Mandiri (Self-Service):**
   - Menampilkan *checklist* persyaratan lengkap (menyelesaikan masalah kurangnya informasi di sistem berjalan).
3. **Arsitektur TOGAF Viewer:**
   - Sebuah panel interaktif untuk dosen penguji/user melihat langsung bagaimana arsitektur (Phase A-D) diterapkan di desa tersebut.

---

## 6. Persyaratan Eksekusi Lanjutan

1. **Build Tool:** Lakukan inisialisasi project menggunakan modul (jika menggunakan Vite: `npm create vite@latest . -- --template vanilla`).
2. **TailwindCSS:** Pasang via PostCSS/NPM atau CDN tersendiri untuk styling, pastikan konfigurasi warna dimasukkan.
3. **JavaScript:** Gunakan pola arsitektur *Model-View-Controller* (MVC) ringan dengan Vanilla JS. `Model` mengambil data JSON, `View` merender DOM, `Controller` mengatur event (klik menu, submit tracker).
4. **Hosting:** Saat kode siap, proyek dapat langsung di-push ke GitHub dan dihubungkan ke Vercel untuk otomatis online.