# 🌅 Desaharapan — Landing Page Build Guide

> Panduan pembangunan lengkap landing page **Desaharapan** dengan design system dari ui-ux-pro-max.
> Design system persisted di `design-system/desaharapan/MASTER.md`.

---

## 📋 Project Overview

| Info | Detail |
|------|--------|
| **Project** | Desaharapan Landing Page |
| **Stack** | HTML + Tailwind CSS (Vanilla) |
| **Pattern** | Scroll-Triggered Storytelling |
| **Style** | Social Proof-Focused |
| **Generated** | 2026-06-10 via ui-ux-pro-max |

---

## 🎨 Design System (dari ui-ux-pro-max)

> **Source of Truth:** [`design-system/desaharapan/MASTER.md`](./design-system/desaharapan/MASTER.md)
> Untuk page-specific override, buat file di `design-system/desaharapan/pages/[page].md`

### 🎨 Color Palette — "Sky Blue Trust + Warm CTA"

| Role | Hex | CSS Variable | Penggunaan |
|------|-----|--------------|------------|
| **Primary** | `#0EA5E9` | `--color-primary` | Navbar, link, icon utama |
| **Secondary** | `#38BDF8` | `--color-secondary` | Hover state, highlight, badge |
| **CTA / Accent** | `#F97316` | `--color-cta` | Button utama, call-to-action |
| **Background** | `#F0F9FF` | `--color-background` | Page background, card bg |
| **Text** | `#0C4A6E` | `--color-text` | Body text, heading |

```css
:root {
  --color-primary:    #0EA5E9;
  --color-secondary:  #38BDF8;
  --color-cta:        #F97316;
  --color-background: #F0F9FF;
  --color-text:       #0C4A6E;
}
```

---

### 🔤 Typography — "Geometric Modern"

| Element | Font | Weight | Ukuran |
|---------|------|--------|--------|
| **Heading** | Outfit | 600–700 | 2rem–4rem |
| **Subheading** | Outfit | 500 | 1.25rem–1.5rem |
| **Body** | Work Sans | 400 | 1rem (16px) |
| **Caption / Label** | Work Sans | 500 | 0.875rem |
| **CTA Button** | Outfit | 600 | 1rem |

```css
/* Import di bagian paling atas CSS */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --font-heading: 'Outfit', sans-serif;
  --font-body:    'Work Sans', sans-serif;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-background);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
```

**Tailwind Config:**
```js
fontFamily: {
  heading: ['Outfit', 'sans-serif'],
  body:    ['Work Sans', 'sans-serif'],
}
```

---

### 📐 Spacing System

| Token | Value | Penggunaan |
|-------|-------|------------|
| `--space-xs` | `4px` / `0.25rem` | Tight gap antar elemen kecil |
| `--space-sm` | `8px` / `0.5rem` | Icon gap, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding card |
| `--space-lg` | `24px` / `1.5rem` | Section inner padding |
| `--space-xl` | `32px` / `2rem` | Large gap, grid gap |
| `--space-2xl` | `48px` / `3rem` | Margin antar section |
| `--space-3xl` | `64px` / `4rem` | Hero section padding |

---

### 🌑 Shadow System

| Level | Value | Penggunaan |
|-------|-------|------------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift, inline badge |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Hover card, dropdown |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero image, modal |

---

### 🔲 Component Specs

#### Button

```css
/* Primary Button — CTA Orange */
.btn-primary {
  background: var(--color-cta);       /* #F97316 */
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
  transition: all 200ms ease;
  cursor: pointer;
  border: none;
}
.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.btn-primary:focus-visible {
  outline: 3px solid var(--color-cta);
  outline-offset: 2px;
}

/* Secondary Button — Sky Blue Outline */
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 12px 24px;
  border-radius: 8px;
  font-family: var(--font-heading);
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
.btn-secondary:hover {
  background: var(--color-primary);
  color: white;
}
```

#### Card

```css
.card {
  background: white;
  border-radius: 12px;
  padding: var(--space-lg);
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
  border: 1px solid #E0F2FE;
}
.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  border-color: var(--color-secondary);
}
```

#### Input

```css
.input {
  padding: 12px 16px;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--color-text);
  transition: border-color 200ms ease;
  width: 100%;
}
.input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.12);
}
```

---

## 🗂️ Struktur Halaman (Page Pattern)

**Pattern:** Scroll-Triggered Storytelling
> Narasi meningkatkan time-on-page 3×. Gunakan progress indicator. Mobile: sederhanakan animasi.

### Urutan Section

| # | Section | Tujuan | CTA |
|---|---------|--------|-----|
| 1 | **Navbar** | Navigasi + branding, floating style | — |
| 2 | **Hero — Intro Hook** | Tagline kuat, visual emosional, CTA utama | Primary CTA atas |
| 3 | **Stats / Credibility Bar** | Angka impact, trust signal cepat | — |
| 4 | **Problem Chapter** | Identifikasi masalah yang dirasakan user | Mini CTA |
| 5 | **Journey Chapter** | Cerita perjalanan / cara kerja Desaharapan | Mini CTA |
| 6 | **Solution Chapter** | Program / layanan unggulan dengan fitur detail | Mini CTA |
| 7 | **Testimonials** | Social proof — kuotasi, foto, rating bintang | — |
| 8 | **Partner Logos** | Logo mitra / organisasi pendukung | — |
| 9 | **FAQ** | Accordion jawaban pertanyaan umum | — |
| 10 | **Climax CTA** | Section final dengan desain bold, CTA besar | Primary CTA bawah |
| 11 | **Footer** | Link, kontak, sosmed, copyright | — |

---

## 🏗️ File Structure

```
desaharapan-landingpage/
├── index.html              ← Entry point utama
├── css/
│   ├── main.css            ← Global styles, design tokens, utilities
│   ├── components.css      ← Button, Card, Input, Badge, dll.
│   └── animations.css      ← Keyframes, scroll-triggered animations
├── js/
│   ├── main.js             ← Init, intersection observer, counter
│   ├── carousel.js         ← Testimonial carousel
│   └── accordion.js        ← FAQ accordion
├── assets/
│   ├── images/             ← Foto, ilustrasi hero
│   └── icons/              ← SVG icons (Lucide/Heroicons)
├── design-system/
│   └── desaharapan/
│       ├── MASTER.md       ← Source of Truth design system
│       └── pages/          ← Page-specific overrides (jika ada)
└── buat.md                 ← File ini (build guide)
```

---

## ✨ Efek & Animasi

### Key Effects (dari design system)

| Efek | Implementasi | Section |
|------|-------------|---------|
| **Number Count-Up** | `IntersectionObserver` + JS counter | Stats Bar |
| **Testimonial Carousel** | CSS scroll-snap + JS nav | Testimonials |
| **Logo Grid Fade-In** | `@keyframes fadeInUp` + stagger delay | Partner Logos |
| **Review Star Ratings** | SVG bintang + animasi fill | Testimonials |
| **Scroll Progress Indicator** | Fixed thin bar di atas halaman | Global |
| **Reveal on Scroll** | `IntersectionObserver` + `.is-visible` class | Semua section |

### CSS Animasi Dasar

```css
/* Reveal on Scroll */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays untuk grid items */
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 100ms; }
.reveal:nth-child(3) { transition-delay: 200ms; }
.reveal:nth-child(4) { transition-delay: 300ms; }

/* Count-up animation */
@keyframes countUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* prefers-reduced-motion — wajib! */
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal.is-visible,
  * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}
```

### JS Intersection Observer

```js
// main.js — Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));
```

---

## 🧭 Navbar Spec

```
Position : Fixed + Floating (top-4 left-4 right-4, bukan top-0 full-width)
Bg       : white/80 backdrop-blur-md (glassmorphism ringan)
Padding  : px-6 py-3
Border   : 1px solid rgba(14,165,233,0.15)
Shadow   : var(--shadow-md)
Max-width: max-w-6xl mx-auto
```

**Elemen Navbar:**
- Logo Desaharapan (SVG atau text dengan font Outfit Bold)
- Nav links: Tentang | Program | Testimoni | Kontak
- CTA Button: "Bergabung Sekarang" → `.btn-primary` kecil
- Mobile: hamburger menu dengan slide-down panel

> ❌ Anti-pattern: jangan tempel navbar ke `top-0` tanpa spacing → pakai `top-4 left-4 right-4`

---

## 🦸 Hero Section Spec

```
Layout    : 2-column (text kiri, visual kanan) → stacked di mobile
Min-height: 100dvh
Padding   : pt-32 pb-20 (account for floating navbar)
Background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%)
```

**Konten Hero:**
- **Eyebrow badge:** "Inspirasi · Harapan · Perubahan"
- **H1:** Tagline utama 2–3 baris, font Outfit 700, 3rem–4rem
- **Subtext:** Deskripsi singkat 1–2 kalimat, Work Sans 400, 1.125rem
- **CTA Group:** `[Bergabung Sekarang]` (primary) + `[Pelajari Lebih]` (secondary)
- **Visual:** Ilustrasi atau foto hero berkualitas tinggi
- **Scroll hint:** Animated chevron bawah

---

## 📊 Stats / Credibility Bar Spec

```
Layout  : 3–4 kolom, centered
BG      : white dengan subtle border atas bawah
Padding : py-12
```

**Contoh Stats:**
| Angka | Label |
|-------|-------|
| `1.200+` | Orang yang terbantu |
| `5 Tahun` | Pengalaman program |
| `98%` | Kepuasan peserta |
| `30+` | Mitra organisasi |

- Gunakan **number count-up** animation saat section masuk viewport
- Font angka: Outfit 700, 2.5rem, warna primary `#0EA5E9`
- Font label: Work Sans 400, 0.9rem, warna text muted `#475569`

---

## 💬 Testimonials Section Spec

```
Layout   : Carousel auto-scroll + manual nav panah kiri/kanan
Cards    : max 3 visible di desktop, 1 di mobile
BG       : gradient ringan / slightly off-white
```

**Struktur Testimonial Card:**
- Foto avatar (bulat, border 2px primary)
- Nama + jabatan/kota
- Rating bintang SVG (1–5, animasi fill)
- Kutipan teks (Work Sans italic, 1rem)
- Badge program yang diikuti

> ✅ Efek: carousel animations, star rating fill animation, card fade-in stagger

---

## ❓ FAQ Section Spec

```
Layout  : Single column, max-w-2xl centered
Pattern : Accordion (satu terbuka sekaligus)
```

**Accordion CSS:**
```css
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease, padding 300ms ease;
}
.faq-item.open .faq-answer {
  max-height: 500px;
  padding-bottom: 16px;
}
```

---

## 🎯 Climax CTA Section Spec

```
BG     : gradient bold — linear-gradient(135deg, #0EA5E9, #0369A1)
Text   : white
Padding: py-24
```

**Konten:**
- Heading besar: "Mulai Perjalanan Harapanmu"
- Subtext: 1 kalimat persuasif
- CTA besar orange: "Daftar Sekarang — Gratis"
- Trust text di bawah: "Bergabung dengan 1.200+ orang yang telah mengubah hidup mereka"

---

## 🦶 Footer Spec

```
BG     : #0C4A6E (color-text, dark blue)
Text   : white / slate-300
Columns: 4 kolom di desktop, 2 di tablet, 1 di mobile
```

**Kolom Footer:**
1. **Brand** — Logo + tagline + sosmed icons (SVG Lucide)
2. **Program** — Link ke program-program
3. **Perusahaan** — Tentang, Blog, Karir, Kontak
4. **Kontak** — Alamat, email, nomor telepon

> ✅ Pastikan info kontak **TIDAK disembunyikan** (anti-pattern: hidden contact info)

---

## 🚫 Anti-Patterns — JANGAN Dilakukan

Berdasarkan ui-ux-pro-max:

| ❌ Anti-Pattern | ✅ Yang Benar |
|----------------|-------------|
| Emoji sebagai ikon (`🚀 🎯`) | SVG icons dari Lucide / Heroicons |
| Navbar nempel `top-0` full-width | Floating navbar `top-4 left-4 right-4` |
| Hover scale yang geser layout | Hover opacity + translateY(-2px) saja |
| Teks kontras rendah (< 4.5:1) | Gunakan `#0C4A6E` untuk body text |
| Transition instan / terlalu lambat | `transition: all 200ms ease` |
| Focus state tidak terlihat | `focus-visible:ring-2` selalu ada |
| `cursor: default` pada card | `cursor: pointer` semua elemen klik |
| Navigasi kompleks / tersembunyi | Simple nav + kontak mudah ditemukan |
| Animasi terus-menerus (looping) | Animasi hanya trigger sekali saat masuk viewport |
| Abaikan `prefers-reduced-motion` | Selalu wrap animasi dengan media query |

---

## ✅ Pre-Delivery Checklist

### Visual Quality
- [ ] Tidak ada emoji sebagai ikon (gunakan SVG)
- [ ] Semua ikon dari icon set konsisten (Lucide)
- [ ] Logo brand benar (diverifikasi dari Simple Icons jika ada)
- [ ] Hover state tidak menyebabkan layout shift
- [ ] Warna menggunakan CSS variables langsung

### Interaksi
- [ ] Semua elemen yang bisa diklik punya `cursor: pointer`
- [ ] Hover state memberikan visual feedback yang jelas
- [ ] Transisi smooth (150–300ms)
- [ ] Focus state terlihat untuk keyboard navigation

### Light Mode Contrast
- [ ] Text utama kontras cukup (4.5:1 minimum)
- [ ] Card/glass element terlihat jelas di light mode
- [ ] Border terlihat (`border-color: #CBD5E1` minimum)

### Layout
- [ ] Floating navbar punya spacing dari tepi (`top-4 left-4 right-4`)
- [ ] Tidak ada konten tersembunyi di balik navbar fixed
- [ ] Responsive di 375px, 768px, 1024px, 1440px
- [ ] Tidak ada horizontal scroll di mobile

### Aksesibilitas
- [ ] Semua gambar punya `alt` text
- [ ] Form input punya `<label>` yang terhubung
- [ ] Warna bukan satu-satunya indikator status
- [ ] `prefers-reduced-motion` dihormati

---

## 🔧 Tech Stack

| Layer | Teknologi | Catatan |
|-------|-----------|---------|
| **Markup** | HTML5 Semantik | `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| **Styling** | Vanilla CSS + CSS Variables | Tidak pakai Tailwind framework, full control |
| **Font** | Google Fonts (Outfit + Work Sans) | Via `@import` di CSS |
| **Icons** | Lucide Icons (SVG inline) | Tidak pakai emoji, tidak pakai font icon |
| **Animation** | CSS + Vanilla JS | IntersectionObserver, no external library |
| **Carousel** | Vanilla JS + CSS scroll-snap | No jQuery, no Swiper (keep it light) |

---

## 🚀 Development Steps

1. **[ ]** Setup file structure (`index.html`, `css/`, `js/`, `assets/`)
2. **[ ]** Implement `css/main.css` — design tokens (CSS variables), reset, typography, utilities
3. **[ ]** Implement `css/components.css` — button, card, input, badge, accordion
4. **[ ]** Implement `css/animations.css` — reveal, count-up, carousel, reduced-motion
5. **[ ]** Build `index.html` — semua section dari Navbar hingga Footer
6. **[ ]** Implement `js/main.js` — scroll reveal, number counter, scroll progress bar
7. **[ ]** Implement `js/carousel.js` — testimonial carousel auto + manual
8. **[ ]** Implement `js/accordion.js` — FAQ accordion
9. **[ ]** Isi konten nyata (teks, statistik, testimoni, program)
10. **[ ]** Generate / siapkan assets gambar
11. **[ ]** Test responsive di 375px, 768px, 1024px, 1440px
12. **[ ]** Jalankan Pre-Delivery Checklist di atas
13. **[ ]** Optimasi performa (lazy load gambar, minify jika perlu)

---

## 📁 Design System Files

| File | Deskripsi |
|------|-----------|
| [`design-system/desaharapan/MASTER.md`](./design-system/desaharapan/MASTER.md) | Global Source of Truth — wajib dibaca sebelum coding |
| `design-system/desaharapan/pages/` | Override per-halaman (buat jika ada perbedaan) |

> **Cara pakai:** Saat build halaman baru, cek dulu `pages/[halaman].md`.
> Jika ada → rules-nya override MASTER. Jika tidak ada → ikuti MASTER saja.

---

*Build guide ini di-generate dengan **ui-ux-pro-max** design intelligence.*
*Last updated: 2026-06-10*
