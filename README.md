# KBIH Ibnu Aqil — Aplikasi Manajemen Jamaah

Aplikasi web untuk pembimbing umroh: data jamaah, denah kursi bis, agenda,
absensi, kumpulan doa, deteksi lokasi, dan laporan ke Telegram.

**Panduan pemasangan lengkap ada di [PANDUAN.md](PANDUAN.md).**

## Menjalankan di komputer

```bash
npm install
npm run dev
```

## Publish

Otomatis ke GitHub Pages setiap `git push` ke branch `main`.

## Teknologi

- React + Vite
- Firebase Authentication (login pembimbing)
- Cloud Firestore (penyimpanan & sinkronisasi data)
- GitHub Pages (hosting)
