# Algorithm – Meet Our Team

Website perkenalan tim bootcamp yang dibuat dengan **HTML, CSS, dan JavaScript native** (tanpa framework atau library). Halaman memuat penjelasan singkat tentang algoritma, profil anggota tim lengkap dengan job desk, dan testimoni berupa pesan dan kesan selama bootcamp.

---

## 1. Cara menjalankan

1. Taruh `index.html`, `style.css`, `script.js`, dan folder `images/` dalam satu folder.
2. Buka `index.html` di browser. Tidak perlu server atau instalasi apa pun.
3. Font Poppins dimuat dari Google Fonts, jadi perlu internet. Tanpa internet, tampilan memakai font sans-serif bawaan sistem.

```
project/
├── index.html      → struktur halaman
├── style.css       → tampilan, warna, tema terang/gelap
├── script.js       → data, carousel, tema, highlight kursor
├── README.md
└── images/         → foto anggota (mis. images/nengah 2.jpg)
```

---

## 2. Struktur dan desain halaman

Desain mengikuti wireframe Figma (Desktop 1 dan Desktop 2). Halaman berupa satu halaman panjang (*single page*) dengan lima bagian. Navbar membawa pengunjung ke tiap bagian lewat *anchor link* dengan scroll halus.

| Urutan | Bagian | ID | Isi |
|---|---|---|---|
| – | Navbar | – | Beranda, Algoritma, Anggota, Testimonial, dan tombol tema. Menempel di atas (*sticky*) dan menandai menu aktif saat di-scroll |
| 1 | Hero | `#home` | Judul "Meet Our Team / Algorithm" dan deskripsi singkat |
| 2 | Algoritma | `#algoritma` | Flowchart contoh (angka genap atau ganjil) di kiri, penjelasan apa itu algoritma di kanan |
| 3 | Anggota | `#anggota` | Panel detail anggota, kontrol navigasi, dan carousel kartu foto |
| 4 | Testimonial | `#testimonial` | Rata-rata rating dan kartu ulasan bergaya Google Maps |
| – | Footer | – | Hak cipta |

### Bagian Anggota

Bagian ini adalah gabungan Desktop 1 dan Desktop 2 pada wireframe.

- **Panel detail** selalu terbuka. Isinya foto, nama, role, biodata (prodi, kampus, email), dan job desk. Job desk terdiri dari judul, deskripsi, dan kartu "Yang dikerjakan".
- **Carousel** berisi 6 kartu, satu per anggota, tanpa duplikat. Kartu di tengah paling besar, lalu mengecil ke kiri dan kanan (kecil → besar → kecil). Jarak antar tepi kartu dibuat konstan walau ukurannya berbeda, supaya susunan tetap rapi.
- **Perpindahan anggota:**
  - otomatis tiap 5 detik,
  - tombol ‹ dan ›,
  - klik kartu di carousel,
  - panah kiri/kanan di keyboard.
- **Tombol jeda (❚❚)** menghentikan atau melanjutkan perpindahan otomatis. Setiap perpindahan manual mengulang hitungan 5 detik dari awal.

### Fitur lain

- **Mode terang dan gelap** lewat tombol ☾/☀ di navbar. Pilihan disimpan di browser, dan kunjungan pertama mengikuti pengaturan tema perangkat.
- **Background grid** 40px yang memudar ke bawah.
- **Highlight kursor:** cahaya lembut yang mengikuti kursor dan membuat garis grid di sekitarnya menyala. Efek ini otomatis mati di layar sentuh.
- **Responsif:** di bawah 720px, panel detail dan kartu job desk tersusun satu kolom, dan navbar dirapatkan.
- **Aksesibilitas:** tombol dan kartu punya `aria-label`, kartu bisa difokus dan dipilih dengan Enter/Spasi, dan animasi dikurangi bila perangkat memakai *reduced motion*.

### Lapisan tumpukan (z-index)

| Elemen | Lapisan |
|---|---|
| Navbar | 1000 (selalu paling atas) |
| Cahaya kursor | 900 |
| Konten halaman | normal |
| Grid background | -1 (paling belakang) |

Carousel diberi `isolation: isolate` supaya kartu yang membesar tidak pernah menimpa navbar.

### Tipografi

**Poppins** (bobot 300–600). Font geometris yang bulat dan bersih ini sama dengan yang terlihat pada wireframe, dan tetap mudah dibaca pada ukuran kecil (11–13px) yang banyak dipakai untuk teks pendukung.

---

## 3. Palet warna

Semua warna disimpan sebagai **CSS variable** di bagian atas `style.css`. Tema terang ada di `:root`, tema gelap di `:root[data-theme="dark"]`. Jadi untuk mengganti warna cukup ubah di satu tempat.

### Tema terang (default)

Dibuat **monokrom abu-abu**, mengikuti wireframe Figma yang seluruhnya hitam, putih, dan abu-abu. Dengan begitu fokus pengunjung tertuju pada foto dan konten tim, bukan pada warna.

| Variable | Kode | Dipakai untuk |
|---|---|---|
| `--bg` | `#ffffff` | Background halaman |
| `--ink` | `#111111` | Teks utama, judul |
| `--muted` | `#666666` | Teks pendukung (deskripsi, label) |
| `--gray` | `#d9d9d9` | Placeholder foto, kartu kosong |
| `--gray-soft` | `#f3f3f3` | Panel biodata |
| `--surface` | `#ffffff` | Kartu (ulasan, panel, kartu job desk) |
| `--line` | `#e5e5e5` | Garis tepi tipis |
| `--text-soft` | `#444444` | Paragraf panjang |
| `--accent` / `--accent-text` | `#111111` | Menu aktif, outline kartu aktif, tombol |
| `--star` / `--star-off` | `#fbbc04` / `#cfcfcf` | Bintang rating aktif / kosong |

Abu-abu `#d9d9d9` dipilih karena sangat dekat dengan warna kotak placeholder pada wireframe. Bintang kuning `#fbbc04` adalah warna rating Google Maps, sesuai permintaan agar testimoni terlihat seperti ulasan Maps.

### Tema gelap

Memakai keluarga warna **slate** (biru keabu-abuan yang sangat gelap) dengan satu aksen **indigo**.

| Variable | Kode | Dipakai untuk |
|---|---|---|
| `--bg` | `#0f172a` | Background halaman (*Deep Slate*) |
| `--ink` | `#f8fafc` | Teks utama (putih lembut) |
| `--muted` | `#94a3b8` | Teks pendukung |
| `--gray` | `#334155` | Placeholder foto, footer |
| `--gray-soft` / `--surface` | `#1e293b` | Panel dan kartu (*Muted Slate*) |
| `--line` | `#334155` | Garis tepi |
| `--text-soft` | `#cbd5e1` | Paragraf panjang |
| `--accent` | `#6366f1` | Aksen utama (Indigo): tombol, outline kartu aktif, garis flowchart |
| `--accent-text` | `#818cf8` | Versi indigo yang lebih terang untuk teks kecil |
| `--star-off` | `#475569` | Bintang kosong |

### Kenapa memilih warna ini?

- **Slate gelap (`#0f172a`)** lebih nyaman di mata daripada hitam murni dan memberi kesan modern dan profesional. Teks putih lembut `#f8fafc` menjaga kontras tinggi tanpa terlalu menyilaukan.
- **Dua lapis gelap (`#0f172a` dan `#1e293b`)** membuat kartu dan panel terlihat terangkat dari background tanpa memakai bayangan berat.
- **Indigo (`#6366f1`)** dipilih sebagai satu-satunya warna aksen: cukup hidup untuk menarik perhatian ke elemen interaktif (tombol, kartu aktif) namun tetap tenang dan cocok dengan nuansa teknologi. Memakai satu aksen saja menjaga tampilan tetap bersih.
- **`--accent-text` lebih terang** karena indigo asli terlalu gelap untuk teks kecil di atas background gelap. Versi `#818cf8` dipakai untuk teks supaya tetap terbaca jelas.
- **Aksen di tema terang sengaja hitam (`#111111`)** supaya tampilan terang tetap sama persis dengan wireframe. Karena aksen berupa variable, semua elemen interaktif otomatis berganti warna saat tema berubah.

### Warna efek kursor

| Variable | Nilai | Keterangan |
|---|---|---|
| `--glow` | `#6366f1` | Warna cahaya dan garis grid yang menyala (indigo, sama di kedua tema) |
| `--glow-pct` | `16%` terang / `24%` gelap | Kekuatan cahaya. Lebih rendah di tema terang agar tidak terlihat seperti noda |

---

## 4. Mengubah isi website

Semua data ada di bagian atas `script.js`.

### Anggota (`members`)

```js
{
  nama: "Nengah Syaiful Bahri",
  role: "Ketua / Frontend Developer",
  foto: "images/nengah 2.jpg",       // kosongkan "" untuk placeholder inisial
  prodi: "S1 Ilmu Komputer",
  kampus: "Universitas Pendidikan Ganesha",
  email: "satu@email.com",
  jobdesk: {
    judul: "Beranda & Struktur Halaman",
    deskripsi: "Merancang kerangka halaman, ...",
    tugas: ["Membuat struktur HTML yang semantik", "..."],  // jumlah bebas
  },
}
```

Jumlah kartu carousel mengikuti jumlah anggota di array ini. Baris biodata yang kosong tidak ditampilkan, dan job desk disembunyikan bila `jobdesk` tidak diisi.

### Testimoni (`testimonials`)

```js
{ nama: "Anggota Satu", rating: 5, tanggal: "2 minggu lalu", pesan: "..." }
```

Rata-rata rating dan jumlah ulasan dihitung otomatis.

### Pengaturan carousel (`script.js`)

| Konstanta | Fungsi | Nilai sekarang |
|---|---|---|
| `AUTO_MS` | Jeda perpindahan otomatis (milidetik) | `5000` |
| `CARD_W` | Lebar dasar kartu (px) | `170` |
| `GAP` | Jarak tetap antar tepi kartu (px) | `24` |
| `MIN_SCALE` / `MAX_SCALE` | Ukuran kartu terkecil / terbesar | `0.6` / `1.3` |
| `FOCUS_R` | Seberapa lebar efek membesar menyebar dari tengah | `2.5` |

---

## 5. Catatan teknis

- Posisi kartu carousel dihitung lewat JavaScript (`requestAnimationFrame`) dengan tabel posisi, supaya jarak antar kartu selalu konstan walau ukurannya berubah.
- Tema dipasang lewat atribut `data-theme` pada `<html>`. Skrip kecil di `<head>` memasangnya sebelum halaman tampil sehingga tidak ada kedipan putih saat memuat tema gelap. Kunci penyimpanannya adalah `theme` di `localStorage`.
- Semua teks yang berasal dari data dimasukkan lewat `textContent` pada job desk, sehingga aman dari karakter khusus seperti `&`.