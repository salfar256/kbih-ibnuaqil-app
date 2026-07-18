# Panduan — KBIH Ibnu Aqil

Aplikasi manajemen jamaah umroh untuk pembimbing.

**Hosting:** GitHub Pages (gratis)
**Database & login:** Firebase — proyek `kbih-ibnuaqil-app`, paket Spark (gratis, tanpa kartu)

---

## Ringkasan Langkah

1. Nyalakan Authentication & Firestore di Firebase Console
2. Pasang aturan keamanan Firestore
3. Upload kode ke GitHub
4. Aktifkan GitHub Pages
5. **Izinkan domain github.io di Firebase** ← paling sering terlewat
6. Daftar akun pembimbing pertama

---

## Bagian 1 — Firebase Console

### 1.1 Authentication (login pembimbing)

1. Menu kiri → **Authentication** → **Get started**
2. Tab **Sign-in method** → klik **Email/Password** → **Enable** → **Save**

### 1.2 Firestore Database (penyimpanan data)

1. Menu kiri → **Firestore Database** → **Create database**
2. **Standard edition** → **Next**
3. Database ID: biarkan `(default)`
4. Location: **asia-southeast1 (Singapore)**
5. **Production mode** → **Create**

### 1.3 Storage — dilewati

Tidak dipakai. Abaikan tombol "Upgrade project" di halaman Storage.

---

## Bagian 2 — Aturan Keamanan

**Wajib.** Tanpa ini aplikasi menampilkan "Missing or insufficient permissions".

Console → **Firestore Database** → tab **Rules** → hapus isinya, tempel ini → **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function sudahLogin() {
      return request.auth != null;
    }

    match /periode/{idPeriode} {
      allow read, write: if sudahLogin();
      match /{koleksi}/{idIsi} {
        allow read, write: if sudahLogin();
      }
    }

    match /doa/{id}   { allow read, write: if sudahLogin(); }
    match /fiqh/{id}  { allow read, write: if sudahLogin(); }
    match /data/{id}  { allow read, write: if sudahLogin(); }

    match /{document=**} { allow read, write: if false; }
  }
}
```

---

## Bagian 3 — Upload ke GitHub

### 3.1 Buat repositori

1. Buka https://github.com/new
2. Repository name: **`kbih-ibnuaqil-app`**
3. Pilih **Public**

> Catatan: repositori boleh publik. Kunci Firebase di dalam kode memang dirancang terlihat dari browser — pengamannya adalah aturan keamanan (Bagian 2) dan login. Token Telegram **tidak** ada di dalam kode; nanti diisi lewat aplikasi.

4. **Jangan** centang "Add a README file"
5. **Create repository**

### 3.2 Upload berkas

Buka Terminal / Command Prompt di folder proyek:

```bash
git init
git add .
git commit -m "Aplikasi KBIH Ibnu Aqil"
git branch -M main
git remote add origin https://github.com/NAMA-AKUN-ANDA/kbih-ibnuaqil-app.git
git push -u origin main
```

Ganti `NAMA-AKUN-ANDA` dengan username GitHub Anda.

> Kalau belum punya Git: unduh di https://git-scm.com
> Alternatif tanpa Git: di halaman repositori klik **uploading an existing file**, lalu seret semua berkas ke sana. Pastikan folder `.github` dan `src` ikut terupload.

### 3.3 Aktifkan GitHub Pages

1. Repositori → **Settings** → menu kiri **Pages**
2. Bagian **Source** → pilih **GitHub Actions**
3. Selesai

Buka tab **Actions** untuk melihat prosesnya. Setelah tanda centang hijau muncul (sekitar 1–2 menit), aplikasi tersedia di:

```
https://NAMA-AKUN-ANDA.github.io/kbih-ibnuaqil-app/
```

---

## Bagian 4 — Izinkan Domain github.io di Firebase

**Ini wajib, kalau dilewati login akan selalu gagal.**

1. Firebase Console → **Authentication** → tab **Settings**
2. Bagian **Authorized domains** → **Add domain**
3. Isi: `NAMA-AKUN-ANDA.github.io` (tanpa `https://`, tanpa nama repo)
4. **Add**

---

## Bagian 5 — Daftar Akun Pertama

1. Buka alamat aplikasi Anda
2. Klik **"Daftar di sini"**
3. Isi email & kata sandi (minimal 6 karakter) → **Daftar**

Anda langsung masuk. Data contoh akan otomatis terisi — silakan ganti dengan data asli.

---

## Bagian 6 — Sambungkan Bot Telegram

1. Di aplikasi, buka halaman **Laporan**
2. Klik **Koneksi Telegram Bot**
3. Klik **Ubah** pada Bot Token → tempel token baru dari @BotFather
4. Isi **Chat ID**: `-5191781323`
5. Isi nama pencatat → **Simpan**
6. Klik **Kirim tes** untuk memastikan berhasil

**Penting:** token lama Anda sudah pernah terlihat, jadi buka **@BotFather** → `/revoke` → ambil token baru.

Pengaturan ini cukup diisi **sekali** — tersimpan di server dan berlaku untuk semua pembimbing.

---

## Memperbarui Aplikasi

Setiap perubahan kode, cukup:

```bash
git add .
git commit -m "keterangan perubahan"
git push
```

GitHub otomatis membangun ulang dan memperbarui aplikasi dalam 1–2 menit.

---

## Menjalankan di Komputer Sendiri (untuk uji coba)

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`. Domain `localhost` sudah otomatis diizinkan Firebase.

---

## Menambahkan Pembimbing Lain

**Cara A** — beri alamat aplikasi, minta klik "Daftar di sini"

**Cara B** (lebih terkendali) — Firebase Console → Authentication → **Users** → **Add user**

**Menutup pendaftaran umum:** buka `src/LoginGate.jsx`, hapus bagian tombol "Daftar di sini", lalu `git push`. Setelah itu hanya Anda yang bisa menambah pembimbing lewat Console.

---

## Cara Memasang Materi PDF

Karena Cloud Storage butuh paket berbayar, materi PDF **ditautkan** dari Google Drive:

1. Unggah PDF ke Google Drive
2. Klik kanan → **Bagikan**
3. Ubah akses ke **"Siapa saja yang memiliki link"** ← wajib, kalau tidak pembimbing lain tak bisa membuka
4. Salin tautannya
5. Di aplikasi: Agenda → Tambah/Ubah → **Tambah tautan materi** → beri nama → tempel tautan → Simpan

Cara sama berlaku untuk lampiran di halaman Doa.

**Foto** tetap diunggah langsung dari aplikasi — otomatis dikecilkan jadi 50–150 KB lalu disimpan di Firestore.

---

## Batas Pemakaian Gratis

| Layanan | Batas | Perkiraan pemakaian Anda |
|---|---|---|
| Firestore — data | 1 GB | Ribuan foto masih muat |
| Firestore — baca | 50.000/hari | Ratusan per hari |
| Firestore — tulis | 20.000/hari | Puluhan per hari |
| Authentication | 50.000 pengguna/bulan | Beberapa pembimbing |
| GitHub Pages | 100 GB/bulan, 1 GB situs | Jauh di bawah batas |

Untuk satu KBIH, semuanya tetap **gratis**.

---

## Struktur Data di Firestore

**Per periode** (terpisah untuk tiap keberangkatan):
```
periode/{id}                    → keterangan periode
periode/{id}/jamaah/            → data jamaah (termasuk foto)
periode/{id}/agenda/            → jadwal kegiatan
periode/{id}/laporan/           → riwayat laporan
periode/{id}/titikKumpul/       → titik kumpul
periode/{id}/titikPenting/      → lokasi penting
periode/{id}/tersesat/          → jamaah yang ditandai tersesat
periode/{id}/data/kursi         → denah kursi bis
periode/{id}/data/absensi       → catatan kehadiran
```

**Dipakai bersama semua periode:**
```
doa/                → kumpulan doa
fiqh/               → hukum fiqh manasik
data/kategoriDoa    → daftar kategori doa
data/kategoriFiqh   → daftar kategori fiqh
data/telegram       → pengaturan bot
```

---

## Memasang Aplikasi di HP

Aplikasi ini bisa dipasang seperti aplikasi biasa, tanpa lewat Play Store.

**Android (Chrome):**
1. Buka alamat aplikasi
2. Muncul tombol **"Pasang Aplikasi"** di bagian atas — tekan itu
3. Atau lewat menu tiga titik → **Tambahkan ke layar utama**

**iPhone (Safari):**
1. Buka alamat aplikasi **di Safari** (bukan Chrome)
2. Tekan tombol **Bagikan** (kotak dengan panah ke atas)
3. Pilih **Tambahkan ke Layar Utama**

Setelah terpasang, ikon KBIH Ibnu Aqil muncul di layar HP dan aplikasi terbuka layar penuh tanpa alamat browser.

---

## Periode Haji & Umroh

Halaman **Periode** adalah beranda aplikasi. Tiap keberangkatan dibuat sebagai periode tersendiri.

**Yang terpisah per periode:** jamaah, kursi bis, agenda, absensi, lokasi, laporan.
**Yang dipakai bersama:** kumpulan doa dan hukum fiqh.

Untuk berpindah periode, tekan tombol **Ganti** pada pita hijau di bawah menu.

**Menghapus periode** akan menghapus seluruh data di dalamnya secara permanen. Karena itu aplikasi menampilkan rincian isinya dulu dan meminta Anda mengetik kata **HAPUS** sebagai penegasan.

---

## Kalau Ada Masalah

**Login gagal terus / "auth/unauthorized-domain"**
Domain github.io belum diizinkan. Ulangi Bagian 4.

**"Missing or insufficient permissions"**
Aturan keamanan belum dipasang. Ulangi Bagian 2.

**Halaman putih setelah dibuka**
Biasanya masalah alamat berkas. Buka tab **Actions** di GitHub, pastikan prosesnya centang hijau. Kalau merah, klik untuk melihat pesan errornya.

**GPS / fitur lokasi tidak jalan**
GitHub Pages sudah HTTPS, jadi seharusnya aktif. Pastikan izin lokasi di browser HP sudah diperbolehkan.

**Halaman Actions tidak muncul / tidak jalan**
Settings → Pages → Source harus **GitHub Actions** (bukan "Deploy from a branch").

**Materi PDF tidak bisa dibuka pembimbing lain**
Akses berbagi Google Drive masih "Terbatas". Ubah ke "Siapa saja yang memiliki link".

---

## Kalau Nanti Ingin Pindah ke Firebase Hosting

Berkas `firebase.json` dan `.firebaserc` sudah disiapkan. Tinggal:

```bash
npm install -g firebase-tools
firebase login
npm run deploy
```

Alamatnya jadi `https://kbih-ibnuaqil-app.web.app`. Jangan lupa domain ini juga sudah otomatis diizinkan Firebase.
