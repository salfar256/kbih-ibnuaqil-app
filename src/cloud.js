// ============================================================
// Lapisan penghubung aplikasi <-> Firebase (tanpa Cloud Storage)
// ============================================================
import { useState, useEffect, useRef } from "react";
import { doc, collection, onSnapshot, setDoc, deleteDoc, getDocs, writeBatch } from "firebase/firestore";
import { initializeApp, getApp, deleteApp } from "firebase/app";
import {
  onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "./firebase";

/* ---------------- Autentikasi ---------------- */

// undefined = masih memeriksa, null = belum login, object = sudah login
export function usePengguna() {
  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u || null)), []);
  return user;
}

export const masuk = (email, sandi) => signInWithEmailAndPassword(auth, email.trim(), sandi);
export const daftar = (email, sandi) => createUserWithEmailAndPassword(auth, email.trim(), sandi);
export const keluar = () => signOut(auth);
export const lupaSandi = (email) => sendPasswordResetEmail(auth, email.trim());

export function pesanGalat(e) {
  const kode = e?.code || "";
  const peta = {
    "auth/invalid-email": "Format email tidak benar.",
    "auth/user-not-found": "Email belum terdaftar.",
    "auth/wrong-password": "Kata sandi salah.",
    "auth/invalid-credential": "Email atau kata sandi salah.",
    "auth/email-already-in-use": "Email ini sudah terdaftar.",
    "auth/weak-password": "Kata sandi minimal 6 karakter.",
    "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi beberapa saat.",
    "auth/network-request-failed": "Gagal terhubung. Periksa koneksi internet.",
    "permission-denied": "Tidak punya izin. Pastikan sudah login.",
    "unavailable": "Server tidak terjangkau. Periksa koneksi internet.",
  };
  return peta[kode] || e?.message || "Terjadi kesalahan.";
}

/* ---------------- Utilitas ---------------- */
const bersihkan = (v) => JSON.parse(JSON.stringify(v ?? null));
const sama = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ---------------- Sinkronisasi KOLEKSI ----------------
   Untuk data berbentuk daftar (jamaah, agenda, doa, dst).
   Tiap baris disimpan sebagai dokumen terpisah, sehingga
   foto yang menempel tidak membebani satu dokumen besar.
   Pemakaiannya sama persis seperti useState biasa.
------------------------------------------------------- */
// jalur bisa berupa "doa" atau ["periode", id, "jamaah"]
const keJalur = (j) => (Array.isArray(j) ? j : [j]);

export function useKoleksiTersinkron(jalur, awal = []) {
  const bagian = jalur ? keJalur(jalur) : null;   // null = tidak berlangganan
  const kunci = bagian ? bagian.join("/") : "";
  const [items, setItems] = useState(awal);
  const [siap, setSiap] = useState(false);
  const terakhir = useRef(null);        // cerminan data di server
  const sudahIsiAwal = useRef(false);

  useEffect(() => {
    terakhir.current = null;
    sudahIsiAwal.current = false;
    if (!kunci) { setItems([]); setSiap(true); return; }
    setSiap(false);
    setItems(awal);
    const kol = collection(db, ...bagian);
    const unsub = onSnapshot(
      kol,
      (snap) => {
        if (snap.empty && !sudahIsiAwal.current && awal.length) {
          // Koleksi masih kosong — isi dengan data contoh sekali saja
          sudahIsiAwal.current = true;
          awal.forEach((it) => setDoc(doc(db, ...bagian, String(it.id)), bersihkan(it)).catch(() => {}));
          return;
        }
        sudahIsiAwal.current = true;
        const data = snap.docs.map((d) => d.data());
        terakhir.current = data;
        setItems(data);
        setSiap(true);
      },
      (err) => { console.error("Gagal membaca", kunci, err); setSiap(true); }
    );
    return unsub;
  }, [kunci]);

  // Tulis hanya bagian yang berubah
  useEffect(() => {
    if (!kunci || terakhir.current === null) return;
    const sebelum = terakhir.current;
    const sekarang = items || [];
    const idSekarang = new Set(sekarang.map((x) => String(x.id)));

    sekarang.forEach((it) => {
      if (it?.id == null) return;
      const lama = sebelum.find((p) => String(p.id) === String(it.id));
      if (!lama || !sama(lama, it)) {
        setDoc(doc(db, ...bagian, String(it.id)), bersihkan(it))
          .catch((e) => console.error("Gagal menyimpan", kunci, e));
      }
    });
    sebelum.forEach((p) => {
      if (!idSekarang.has(String(p.id))) {
        deleteDoc(doc(db, ...bagian, String(p.id))).catch(() => {});
      }
    });
    terakhir.current = sekarang;
  }, [items, kunci]);

  return [items, setItems, siap];
}

/* ---------------- Sinkronisasi DOKUMEN TUNGGAL ----------------
   Untuk data berbentuk objek kecil (denah kursi, absensi).
--------------------------------------------------------------- */
export function useDataTersinkron(jalur, awal) {
  const bagian = jalur ? (Array.isArray(jalur) ? jalur : ["data", jalur]) : null;
  const kunci = bagian ? bagian.join("/") : "";
  const [nilai, setNilai] = useState(awal);
  const [siap, setSiap] = useState(false);
  const abaikan = useRef(false);
  const sudahSiap = useRef(false);

  useEffect(() => {
    sudahSiap.current = false;
    if (!kunci) { setNilai(awal); setSiap(true); return; }
    setSiap(false);
    setNilai(awal);
    const acuan = doc(db, ...bagian);
    const unsub = onSnapshot(
      acuan,
      (snap) => {
        if (snap.exists()) { abaikan.current = true; setNilai(snap.data().value); }
        else setDoc(acuan, { value: bersihkan(awal) }).catch(() => {});
        sudahSiap.current = true; setSiap(true);
      },
      (err) => { console.error("Gagal membaca", kunci, err); setSiap(true); sudahSiap.current = true; }
    );
    return unsub;
  }, [kunci]);

  useEffect(() => {
    if (!kunci || !sudahSiap.current) return;
    if (abaikan.current) { abaikan.current = false; return; }
    const t = setTimeout(() => {
      setDoc(doc(db, ...bagian), { value: bersihkan(nilai) })
        .catch((e) => console.error("Gagal menyimpan", kunci, e));
    }, 500);
    return () => clearTimeout(t);
  }, [nilai, kunci]);

  return [nilai, setNilai, siap];
}

/* ---------------- Pengecilan gambar ----------------
   Gambar dikecilkan langsung di HP sebelum disimpan,
   supaya hemat kuota dan muat di dokumen Firestore.
---------------------------------------------------- */
export function kecilkanGambar(file, sisiMaks = 900, mutu = 0.7) {
  return new Promise((selesai, gagal) => {
    const pembaca = new FileReader();
    pembaca.onerror = () => gagal(new Error("Gagal membaca berkas gambar."));
    pembaca.onload = () => {
      const img = new Image();
      img.onerror = () => gagal(new Error("Berkas gambar tidak dapat dibuka."));
      img.onload = () => {
        let l = img.width, t = img.height;
        if (l > sisiMaks || t > sisiMaks) {
          const rasio = Math.min(sisiMaks / l, sisiMaks / t);
          l = Math.round(l * rasio); t = Math.round(t * rasio);
        }
        const kanvas = document.createElement("canvas");
        kanvas.width = l; kanvas.height = t;
        const ctx = kanvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, l, t);
        ctx.drawImage(img, 0, 0, l, t);

        let hasil = kanvas.toDataURL("image/jpeg", mutu);
        let m = mutu;
        // Kalau masih terlalu besar, turunkan mutu bertahap
        while (hasil.length > 300 * 1024 && m > 0.35) {
          m -= 0.1;
          hasil = kanvas.toDataURL("image/jpeg", m);
        }
        selesai({
          nama: file.name,
          tipe: "image/jpeg",
          ukuran: Math.round((hasil.length * 3) / 4),
          data: hasil,
        });
      };
      img.src = pembaca.result;
    };
    pembaca.readAsDataURL(file);
  });
}

/* ---------------- Tautan berkas (PDF dsb) ----------------
   Berkas besar tidak diunggah, cukup ditautkan dari
   Google Drive / OneDrive / situs lain.
---------------------------------------------------------- */
export function rapikanTautan(url) {
  const u = (url || "").trim();
  if (!u) return null;
  const cocok = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (cocok) return `https://drive.google.com/file/d/${cocok[1]}/view`;
  if (!/^https?:\/\//i.test(u)) return `https://${u}`;
  return u;
}


/* ---------- hapus periode beserta seluruh isinya ---------- */
const SUB_PERIODE = ["jamaah", "agenda", "laporan", "titikKumpul", "titikPenting", "tersesat", "data"];

export async function hapusPeriodeLengkap(idPeriode) {
  for (const sub of SUB_PERIODE) {
    try {
      const isi = await getDocs(collection(db, "periode", String(idPeriode), sub));
      if (isi.empty) continue;
      const batch = writeBatch(db);
      isi.docs.forEach((d) => batch.delete(d.ref));
      await batch.commit();
    } catch (e) {
      console.error("Gagal menghapus", sub, e);
    }
  }
  await deleteDoc(doc(db, "periode", String(idPeriode)));
}

/* Menghitung isi sebuah periode, untuk ditampilkan sebelum dihapus */
export async function hitungIsiPeriode(idPeriode) {
  const hasil = {};
  for (const sub of ["jamaah", "agenda", "laporan"]) {
    try {
      const isi = await getDocs(collection(db, "periode", String(idPeriode), sub));
      hasil[sub] = isi.size;
    } catch { hasil[sub] = 0; }
  }
  return hasil;
}


/* ---------- pengelolaan akun ----------
   Catatan penting: Firebase tidak mengizinkan aplikasi web
   menghapus akun orang lain — itu hanya bisa lewat server
   khusus atau Firebase Console. Karena itu akun yang
   bermasalah dinonaktifkan (diblokir aksesnya), bukan dihapus.
--------------------------------------- */

// Membuat akun baru TANPA membuat pembimbing yang sedang login ikut keluar.
// Caranya memakai sambungan Firebase kedua yang langsung ditutup lagi.
export async function buatAkunBaru(email, sandi) {
  const konfig = getApp().options;
  const namaApp = "pembuat-akun-" + Date.now();
  const app2 = initializeApp(konfig, namaApp);
  const auth2 = getAuth(app2);
  try {
    const kredensial = await createUserWithEmailAndPassword(auth2, email.trim(), sandi);
    const uid = kredensial.user.uid;
    await signOut(auth2);
    return { uid, email: email.trim() };
  } finally {
    try { await deleteApp(app2); } catch { /* abaikan */ }
  }
}

// Memantau data akun milik pengguna yang sedang login
export function useAkunSaya(uid) {
  const [akun, setAkun] = useState(undefined); // undefined = memuat, null = belum terdaftar
  useEffect(() => {
    if (!uid) { setAkun(null); return; }
    const unsub = onSnapshot(
      doc(db, "akun", uid),
      (snap) => setAkun(snap.exists() ? snap.data() : null),
      () => setAkun(null)
    );
    return unsub;
  }, [uid]);
  return akun;
}


/* ---------- satu dokumen apa adanya (tanpa pembungkus value) ----------
   Dipakai akun jamaah untuk membaca & menyunting datanya sendiri.
--------------------------------------------------------------------- */
export function useDokumenMentah(jalur) {
  const bagian = jalur ? (Array.isArray(jalur) ? jalur : [jalur]) : null;
  const kunci = bagian ? bagian.join("/") : "";
  const [data, setData] = useState(null);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    if (!kunci) { setData(null); setSiap(true); return; }
    setSiap(false);
    const unsub = onSnapshot(
      doc(db, ...bagian),
      (snap) => { setData(snap.exists() ? snap.data() : null); setSiap(true); },
      (e) => { console.error("Gagal membaca", kunci, e); setData(null); setSiap(true); }
    );
    return unsub;
  }, [kunci]);

  const simpan = async (baru) => {
    if (!kunci) return;
    await setDoc(doc(db, ...bagian), bersihkan(baru), { merge: true });
  };

  return [data, simpan, siap];
}

/* ---------- menambah satu dokumen baru ----------
   Dipakai jamaah untuk mengirim catatan ke riwayat laporan,
   walau ia tidak boleh membaca laporan pembimbing lain.
------------------------------------------------- */
export async function tambahDokumen(jalur, data) {
  const bagian = Array.isArray(jalur) ? jalur : [jalur];
  const id = String(data.id || Date.now());
  await setDoc(doc(db, ...bagian, id), bersihkan({ ...data, id }));
  return id;
}

/* ---------- cerminan ringkas daftar jamaah ----------
   Berisi nama, foto, telepon, dan rombongan saja — tanpa data
   kesehatan. Inilah yang boleh dibaca akun jamaah, sehingga
   riwayat penyakit dan catatan harian tetap tertutup.
---------------------------------------------------- */
export async function sinkronDirektori(idPeriode, daftar) {
  if (!idPeriode || idPeriode === "kosong") return;
  const jalur = ["periode", String(idPeriode), "direktori"];
  try {
    const adaSekarang = await getDocs(collection(db, ...jalur));
    const lama = {};
    adaSekarang.docs.forEach((d) => { lama[d.id] = d.data(); });

    const batch = writeBatch(db);
    let adaUbahan = false;

    daftar.forEach((j) => {
      const ringkas = {
        id: String(j.id),
        nama: j.nama || "",
        foto: j.foto || null,
        telepon: j.telepon || "",
        rombongan: j.rombongan || "",
      };
      if (!sama(lama[String(j.id)], ringkas)) {
        batch.set(doc(db, ...jalur, String(j.id)), ringkas);
        adaUbahan = true;
      }
    });

    const idBaru = new Set(daftar.map((j) => String(j.id)));
    Object.keys(lama).forEach((id) => {
      if (!idBaru.has(id)) { batch.delete(doc(db, ...jalur, id)); adaUbahan = true; }
    });

    if (adaUbahan) await batch.commit();
  } catch (e) {
    console.error("Gagal menyelaraskan direktori:", e);
  }
}
