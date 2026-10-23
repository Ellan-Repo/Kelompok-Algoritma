/* =========================================================
   DATA – ganti dengan data tim kamu.
   Isi `foto` dengan path gambar, mis. "img/budi.jpg".
   Kalau kosong, kartu menampilkan placeholder abu-abu.
   ========================================================= */
const members = [
  {
    nama: "Nengah Syaiful Bahri",
    role: "Ketua / Frontend Developer",
    foto: "asset/Nengah.jpg",
    prodi: "S1 Ilmu Komputer",
    kampus: "Universitas Pendidikan Ganesha",
    email: "oneweeks@gmail.com",
    jobdesk: {
      deskripsi:
        "Merancang kerangka halaman, menyusun navigasi, dan memastikan setiap bagian saling terhubung dengan baik.",
      tugas: [
        "Membuat struktur HTML yang semantik,CSS dan Javascript",
        "Pembagian tugas tim",
      ],
    },
  },
  {
    nama: "Muhammad Maulana",
    role: "Git Controller",
    foto: "asset/Elan.jpeg",
    prodi: "S1 Ilmu Komputer",
    kampus: "Universitas Pendidikan Ganesha",
    email: "user0xaa55@gmail.com",
    jobdesk: {
      deskripsi:
        "Membuat Repository dan Branch di GitHub.",
      tugas: [
        "Membuat Repository",
        "Membuat Brach",
      ],
    },
  },
  {
    nama: "Tamita Brenia Berutu",
    role: "Copywriter",
    foto: "asset/Tamita.jpeg",
    prodi: "S1 Sistem Informasi",
    kampus: "Universitas Pendidikan Ganesha",
    email: "tamitabreniaputri@gmail.com",
    jobdesk: {
      deskripsi:
        "Membuat dan menyusun teks yang ada di dalam website",
      tugas: [
        "Membuat kalimat penjelasan mengenai algoritma",
        "Menyusun kalimat kesan dan pesan",
    
      ],
    },
  },
  {
    nama: "Ni Putu Nadila Supardan",
    role: "Copywriter",
    foto: "asset/Nadila.jpeg",
    prodi: "S1 Sistem Informasi",
    kampus: "Universitas Pendidikan Ganesha",
    email: "dilaa4la@gmail.com",
    jobdesk: {
      deskripsi:
        "Menyusun teks yang ada di dalam website",
      tugas: [
        "Menyusun kalimat kesan dan pesan",
      ],
    },
  },
  {
    nama: "Ayu Komang Mas Yunika",
    role: "Copywriter",
    foto: "asset/Yunika.jpeg",
    prodi: "S1 Pendidikan Teknik Informatika",
    kampus: "Undiksha",
    email: "ayu.kmmasyunika24@email.com",
    jobdesk: {
      deskripsi:
        "Menyiapkan teks dan konten supaya pesan tim tersampaikan dengan jelas.",
      tugas: [
        "Menulis deskripsi hero dan algoritma",
        "Mengumpulkan pesan dan kesan anggota",
        "Menyusun data testimoni",
        "Memeriksa ejaan seluruh konten",
      ],
    },
  },
];

const testimonials = [
  {
    nama: "Nengah",
    rating: 5,
    pesan:
      "Bootcamp ini mengajarkan cara bekerja dalam tim yang sesungguhnya. Pembagian tugas, review kode, sampai presentasi akhir, semuanya berkesan.",
  },
  {
    nama: "Elan",
    rating: 5,
    pesan:
      "Saya senang bisa mengikuti kegiatan bootcamp selama dua hari karena mendapatkan banyak pengalaman baru.",
  },
  {
    nama: "Cimit",
    rating: 4,
    pesan:
      "Membuat website menjadi pengalaman baru yang menyenangkan dan menambah pengetahuan saya tentang coding.",
  },
  {
    nama: "Nafa",
    rating: 5,
    pesan:
      "Semoga ilmu yang didapat selama bootcamp bisa terus dikembangkan dan diterapkan ke depannya.",
  },
  {
    nama: "Ayu",
    rating: 4,
    pesan:
      "Proyek berbasis data membuat saya paham alur kerja dari pengumpulan data sampai menjadi laporan yang berguna.",
  },
];

/* =========================================================
   HELPERS
   ========================================================= */
const $ = (id) => document.getElementById(id);
const initial = (nama) => nama.trim().charAt(0).toUpperCase();
const photoHTML = (m) =>
  m.foto
    ? `<img src="${m.foto}" alt="Foto ${m.nama}">`
    : `<div class="ph">${initial(m.nama)}</div>`;
const starsHTML = (n) =>
  "★".repeat(n) + `<span class="off">${"★".repeat(5 - n)}</span>`;

/* =========================================================
   CAROUSEL – bergerak kanan ke kiri, kecil → besar → kecil
   ========================================================= */
const carousel = $("carousel");
const track = $("track");
const CARD_W = 170,
  GAP = 24; // GAP = jarak tetap antar tepi kartu
const MIN_SCALE = 0.6,
  MAX_SCALE = 1.3;
const FOCUS_R = 2.5; // seberapa jauh (dalam kartu) efek membesar menyebar
const AUTO_MS = 5000; // durasi otomatis pindah anggota (ms)
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

let f = 0,
  target = 0,
  M = members.length,
  playing = true,
  cards = [],
  activeIndex = 0,
  elapsed = 0,
  last = performance.now();

// skala kartu berdasarkan jaraknya (k, satuan kartu) dari tengah
const scaleAt = (k) =>
  MIN_SCALE +
  (MAX_SCALE - MIN_SCALE) *
    Math.cos((Math.min(1, Math.abs(k) / FOCUS_R) * Math.PI) / 2);

// tabel posisi: jarak pusat kartu dari tengah layar, dihitung supaya
// jarak antar tepi kartu selalu sama walau ukuran kartu berbeda
const T_STEP = 0.02,
  T_MAX = 60;
const table = [0];
for (let j = 1; j <= T_MAX / T_STEP; j++) {
  table[j] =
    table[j - 1] + (CARD_W * scaleAt((j - 0.5) * T_STEP) + GAP) * T_STEP;
}
function posAt(k) {
  const a = Math.abs(k) / T_STEP,
    j = Math.floor(a);
  const last = table.length - 1;
  const p =
    j >= last
      ? table[last] + (a - last) * T_STEP * (CARD_W * MIN_SCALE + GAP)
      : table[j] + (table[j + 1] - table[j]) * (a - j);
  return k < 0 ? -p : p;
}

function buildTrack() {
  const n = members.length;
  M = n; // tepat satu kartu per anggota, tanpa duplikat
  track.innerHTML = "";
  cards = [];
  for (let i = 0; i < M; i++) {
    const m = members[i % n];
    const el = document.createElement("div");
    el.className = "card";
    el.tabIndex = 0;
    el.dataset.index = i % n;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `Lihat detail ${m.nama}`);
    el.innerHTML = photoHTML(m);
    track.appendChild(el);
    cards.push(el);
  }
  markActive();
}

function markActive() {
  cards.forEach((el) =>
    el.classList.toggle("active", +el.dataset.index === activeIndex),
  );
}

function frame(now) {
  const dt = Math.min(100, now - last);
  last = now;
  f += (target - f) * 0.1; // geser halus ke kartu terpilih
  if (playing) {
    elapsed += dt;
    if (elapsed >= AUTO_MS) go(1);
  }
  const center = carousel.clientWidth / 2;

  cards.forEach((el, i) => {
    const k = wrapK(i - f);
    const s = scaleAt(k);
    el.style.transform = `translateX(${(center + posAt(k) - CARD_W / 2).toFixed(2)}px) scale(${s.toFixed(3)})`;
    el.style.zIndex = Math.round(s * 100);
  });
  requestAnimationFrame(frame);
}
const wrapK = (k) => ((((k + M / 2) % M) + M) % M) - M / 2;

/* ---- navigasi anggota ---- */

function select() {
  const n = members.length;
  activeIndex = ((target % n) + n) % n;
  elapsed = 0;
  markActive();
  renderDetail(activeIndex);
}
function go(d) {
  target += d;
  select();
}
function pick(card) {
  if (!card) return;
  target = Math.round(f + wrapK(cards.indexOf(card) - f));
  select();
}

track.addEventListener("click", (e) => pick(e.target.closest(".card")));
track.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    pick(e.target.closest(".card"));
  }
});
$("prevBtn").addEventListener("click", () => go(-1));
$("nextBtn").addEventListener("click", () => go(1));
$("playBtn").addEventListener("click", () => {
  playing = !playing;
  $("playBtn").innerHTML = playing ? "&#10074;&#10074;" : "&#9654;";
  $("playBtn").setAttribute("aria-label", playing ? "Jeda" : "Putar");
});
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input")) return;
  if (e.key === "ArrowRight") go(1);
  if (e.key === "ArrowLeft") go(-1);
});

const detail = $("detail");
function renderDetail(i) {
  const m = members[i];
  $("detailPhoto").innerHTML = photoHTML(m);
  $("detailName").textContent = m.nama;
  $("detailRole").textContent = m.role;
  const bio = [
    ["Prodi", m.prodi],
    ["Kampus", m.kampus],
    ["Email", m.email],
  ].filter(([, v]) => v);
  $("detailBio").innerHTML = bio
    .map(([k, v]) => `<li><span>${k}</span>${v}</li>`)
    .join("");
  // job desk (deskripsi + daftar yang dikerjakan)
  const jd = m.jobdesk;
  $("jobdesk").hidden = !jd;
  if (jd) {
    $("jdTitle").textContent = jd.judul;
    $("jdDesc").textContent = jd.deskripsi;
    const list = $("jdList");
    list.innerHTML = "";
    jd.tugas.forEach((t) => {
      const li = document.createElement("li");
      const tick = document.createElement("i");
      tick.className = "tick";
      tick.textContent = "\u2713";
      const txt = document.createElement("div");
      txt.textContent = t;
      li.append(tick, txt);
      list.appendChild(li);
    });
    $("jobdesk").classList.remove("show");
    void $("jobdesk").offsetWidth;
    $("jobdesk").classList.add("show");
  }
  $("counter").textContent = `${i + 1} / ${members.length}`;
  detail.classList.remove("show");
  void detail.offsetWidth; // restart animasi
  detail.classList.add("show");
}

/* =========================================================
   TESTIMONIAL (gaya rating Google Maps)
   ========================================================= */
function renderTestimonials() {
  const avg =
    testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length;
  $("ratingAvg").textContent = avg.toFixed(1);
  $("ratingStars").innerHTML = starsHTML(Math.round(avg));
  $("ratingCount").textContent = `${testimonials.length} ulasan`;

  $("reviews").innerHTML = testimonials
    .map(
      (t) => `
    <article class="review">
      <div class="review-head">
        <div class="avatar">${initial(t.nama)}</div>
        <div>
          <div class="review-name">${t.nama}</div>
          <div class="review-meta">Peserta bootcamp</div>
        </div>
      </div>
      <div class="review-stars"><span class="stars">${starsHTML(t.rating)}</span></div>
      <p>${t.pesan}</p>
    </article>`,
    )
    .join("");
}

/* =========================================================
   NAVBAR – tandai menu aktif saat scroll
   ========================================================= */
const links = [...document.querySelectorAll(".navbar a")];
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((a) =>
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + en.target.id,
          ),
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
["home", "algoritma", "anggota", "testimonial"].forEach((id) =>
  observer.observe($(id)),
);

/* =========================================================
   TEMA – mode terang / gelap
   ========================================================= */
const themeBtn = $("themeBtn");
const root = document.documentElement;
function themeIcon() {
  const dark = root.dataset.theme === "dark";
  themeBtn.textContent = dark ? "\u2600\uFE0E" : "\u263E\uFE0E";
  themeBtn.setAttribute(
    "aria-label",
    dark ? "Ganti ke mode terang" : "Ganti ke mode gelap",
  );
}
themeBtn.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  themeIcon();
});
themeIcon();

/* =========================================================
   HIGHLIGHT KURSOR – cahaya lembut + grid yang menyala di sekitar kursor
   ========================================================= */
const glow = document.querySelector(".cursor-glow");
if (glow && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let tx = -999,
    ty = -999,
    cx = -999,
    cy = -999,
    raf = null;
  const loop = () => {
    const ease = reduceMotion ? 1 : 0.18;
    cx += (tx - cx) * ease;
    cy += (ty - cy) * ease;
    root.style.setProperty("--mx", cx.toFixed(1) + "px");
    root.style.setProperty("--my", cy.toFixed(1) + "px");
    raf =
      Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3
        ? requestAnimationFrame(loop)
        : null;
  };
  document.addEventListener("mousemove", (e) => {
    if (cx < -900) {
      cx = e.clientX;
      cy = e.clientY;
    } // kemunculan pertama: langsung di posisi kursor
    tx = e.clientX;
    ty = e.clientY;
    glow.classList.add("on");
    if (!raf) raf = requestAnimationFrame(loop);
  });
  root.addEventListener("mouseleave", () => glow.classList.remove("on"));
}

/* =========================================================
   INIT
   ========================================================= */
renderTestimonials();
buildTrack();
select();
requestAnimationFrame(frame);
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildTrack, 150);
});
