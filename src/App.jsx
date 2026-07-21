import React, { useState, useEffect, useMemo, useRef } from "react";
import { usePengguna, useDataTersinkron, useKoleksiTersinkron, useDokumenMentah, tambahDokumen, sinkronDirektori, kecilkanGambar, rapikanTautan, keluar, pesanGalat, hapusPeriodeLengkap, hitungIsiPeriode, buatAkunBaru, useAkunSaya, lupaSandi } from "./cloud";
import LoginGate from "./LoginGate";
import {
  Users, Plus, Search, Pencil, Trash2, ArrowLeft, Phone, MessageCircle,
  MapPin, Stethoscope, Accessibility, HeartHandshake, Calendar, Camera,
  X, Check, User, CreditCard, StickyNote, Moon, Bus, CalendarDays, ClipboardCheck,
  Clock, Link2, GripVertical, CheckCircle2, XCircle, MinusCircle, UserPlus,
  ChevronRight, Armchair, Navigation, Compass, AlertTriangle, Crosshair,
  Landmark, Flag, LocateFixed, FileText, Send, Settings2, RefreshCw, Eye,
  ShieldAlert, BookOpen, FileUp, ImagePlus, Paperclip, Download,
  LogOut, Loader2, CloudOff, Link as LinkIcon, Scale, LayoutGrid,
  Tags, ChevronDown, Download as DownloadIcon, Smartphone, AlertOctagon,
  ArrowRightLeft, Home, Map as MapIcon, Route, HeartPulse, NotebookPen,
  Activity, Thermometer, Smile, Settings, ShieldCheck, ShieldOff, KeyRound,
  UserCog, Mail, CircleSlash, ContactRound, Lock, Hotel, DoorOpen, BedDouble,
  Upload, FileSpreadsheet, FileDown, Siren,
} from "lucide-react";

/* ============================================================
   KBIH IBNU AQIL — Manajemen Jamaah (Prototipe Pembimbing)
   ============================================================ */

const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAA/1BMVEXt3p2bo5ZemWRaaFqaZg8hYS7p59WolmX02XDTrVm3hh3JtpVmVB0mjzeqyqw1mEX2xzYiJR04bETXoCKQd1B7o4O7z8NmyWxUOxLDfAG6vcLBvsA6PEJvhDl7foV8yoeYwHv9/f0WFxYBVRoBSBQHeSfo6OgEZiPW19YoKCcQgywGWyICOA3QmCb1yE7YpC3IyMjQlRnGiRMKCwqzdwqzt7MBZhr71VHrtjUFKAr52Gvw59LquUrjqjAxNDH56K4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQOudJAAAAQHRSTlP/////////////////////////////////////////////////////////////////////////////////////73leyQAAQCRJREFUeNrtnQlj4kjSplP3gY1tsGu6pvfbXSEhVAYhEIhL2Pz/f7URkSkhgQAJcLlmtnOmu23MIT288WbkzZx/Su3C/kHwD6x/YP0D6x9Y/8D6B9Y/CP6B9V8My9d/tNtvsiw/QXl85+URfoaH3trttu7/AwuK3m4Dovf3voalf1g0XvpATpba+v+3sEBMMqgICb0XS//gd/5QnzNDZP7/Z7B04ARiOsLSf++fL4TsSf4mjbHvAYUqOdRO/fJdwNg3gOoXCNVQ0wlgi/7TW/BfCwtIvRcDr39r0RYaCOy/ENYBqcP7Hix4GexrQKwa4RHXdeHhwSlgC+1R/vHfBQtIaSc0RYjgjmXj/7bbjLEdlew/rN2WDFnuaIMFQavm9STp/y2wdPkx01T/EFP/UTbaSAgwmeZ2u7UiKCEW+K9lbS1zwwQ2Q9YGqLMKYov+bwnHL4fVfqqKPuQky21GkLaAZzqN42lWCJb4mR4OI2trIjQmyZ0BAjskBu/3pv9nw9LfCqgKoDTktENMSAnpRKIQp67djbuZvMTDhIwTA40NKhT29fL6SlgBeDpBKklK44IaR/z+OSB7PlehPBwXeHRuZ9TwJUQsbUvK0HUHWIryemr/Z8L6IXNRFav6xZOBiiJBcU7TOSL6i7gor6+GIRWKYbwqCv7lL4QGzKLVil4EwHa6LqHABnn5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";

const C = {
  green: "#0f5c37", greenDeep: "#0a4327", greenSoft: "#e7f0ea",
  gold: "#bd922a", goldDeep: "#9a7620", goldSoft: "#f4ead0",
  bg: "#f4f6f2", surface: "#ffffff", ink: "#17241d", muted: "#68766c",
  border: "#e3e8df", danger: "#b23b3b", dangerSoft: "#f7e7e6",
  blue: "#2f7fa8", blueSoft: "#e6f0f5",
};

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
* { box-sizing: border-box; }
.kbih-root { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: ${C.ink}; }
.kbih-root ::selection { background: ${C.goldSoft}; }
.serif { font-family: 'Fraunces', Georgia, serif; }
.btn { border: none; cursor: pointer; font-family: inherit; font-weight: 600; transition: all .15s ease; display: inline-flex; align-items: center; gap: 8px; }
.btn:active { transform: translateY(1px); }
.card-hover { transition: box-shadow .18s ease, transform .18s ease, border-color .18s ease; }
.card-hover:hover { box-shadow: 0 8px 24px rgba(15,92,55,.10); transform: translateY(-2px); border-color: ${C.green}33; }
input, select, textarea { font-family: inherit; font-size: 14px; color: ${C.ink}; }
.field:focus { outline: none; border-color: ${C.green} !important; box-shadow: 0 0 0 3px ${C.green}22; }
.iconbtn { transition: background .15s ease, color .15s ease; }
.iconbtn:hover { background: ${C.greenSoft}; }
.navtab { transition: all .15s ease; }
.seat { transition: transform .12s ease, box-shadow .12s ease; user-select: none; }
.seat:hover { transform: scale(1.04); }
.seat.dragover { box-shadow: 0 0 0 3px ${C.gold}; }
.kbih-scroll::-webkit-scrollbar { height: 9px; width: 9px; }
.kbih-scroll::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 20px; }
.fade { animation: fade .35s ease; }
@keyframes fade { from { opacity:0; transform: translateY(6px);} to {opacity:1; transform:none;} }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Tulisan Arab */
.arab {
  font-family: 'Arabic Typesetting', 'Amiri', 'Scheherazade New', 'Traditional Arabic', serif;
  line-height: 1.9;
}

/* Tata letak dasar */
.grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.wrap { max-width: 1160px; margin: 0 auto; padding: 26px 22px 60px; }
.hdr-wrap { max-width: 1160px; margin: 0 auto; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; position: relative; }
.bus-layout { display: grid; grid-template-columns: minmax(0, 1fr) 260px; gap: 20px; align-items: start; }
.kartu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }

/* --- Penyesuaian layar HP --- */
@media (max-width: 720px) {
  .grid2 { grid-template-columns: 1fr; }
  .wrap { padding: 18px 13px 48px; }
  .hdr-wrap { padding: 14px 13px; gap: 12px; }
  .bus-layout { grid-template-columns: 1fr; }
  .kartu-grid { grid-template-columns: 1fr; }
  .jam-blok { gap: 14px !important; }
  .jam-angka { font-size: 30px !important; }
  .jam-item { min-width: 138px !important; }
  .judul-hal { font-size: 20px !important; }
  .kop-nama { font-size: 18px !important; }
  .kop-tagline { font-size: 11px !important; }
  .kop-logo { width: 44px !important; height: 44px !important; }
  .navtab { padding: 12px 12px !important; font-size: 13.5px; }
  .kartu-pad { padding: 16px !important; }
  .sembunyi-hp { display: none !important; }
}
@media (max-width: 400px) {
  .jam-blok { gap: 10px !important; }
  .jam-angka { font-size: 26px !important; }
  .jam-item { min-width: 120px !important; }
}
@media (prefers-reduced-motion: reduce) { *, .fade { animation: none !important; } }
`;

const HUB = ["Suami", "Istri", "Anak", "Ayah", "Ibu", "Saudara", "Pendamping", "Kerabat"];

/* ---------- konfigurasi Telegram ----------
   Token TIDAK disimpan di dalam kode. Diisi sekali lewat
   halaman Laporan, lalu tersimpan di Firestore dan hanya
   bisa dibaca pembimbing yang sudah login.
------------------------------------------- */
const TG_KOSONG = { token: "", chatId: "", pencatat: "" };

/* ---------- helper unggah berkas ---------- */
// Gambar dikecilkan dulu di HP agar hemat kuota, lalu disimpan di Firestore.
const bacaBerkas = (file) => kecilkanGambar(file);
const formatUkuran = (b) => (b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`);
const bukaBerkas = (berkas) => { if (berkas?.data) window.open(berkas.data, "_blank", "noopener"); };

/* ---------- helpers ---------- */
function hitungUsia(tgl) {
  if (!tgl) return null;
  const b = new Date(tgl + "T00:00:00"); if (isNaN(b)) return null;
  const n = new Date(); let y = n.getFullYear() - b.getFullYear();
  const m = n.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && n.getDate() < b.getDate())) y--;
  return y;
}
function labelUsia(y) {
  if (y == null) return null;
  if (y >= 60) return { text: `${y} tahun`, tag: "Lansia" };
  if (y < 17) return { text: `${y} tahun`, tag: "Muda" };
  return { text: `${y} tahun`, tag: null };
}
const inisial = (n) => (n || "?").trim().split(/\s+/).slice(0, 2).map((s) => s[0]).join("").toUpperCase();
const idTime = (tz, now) => new Intl.DateTimeFormat("id-ID", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now);
const idDate = (tz, now) => new Intl.DateTimeFormat("id-ID", { timeZone: tz, weekday: "long", day: "numeric", month: "long" }).format(now);
const tglPanjang = (tgl) => { if (!tgl) return "—"; const d = new Date(tgl + "T00:00:00"); return isNaN(d) ? "—" : new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(d); };
const tglRingkas = (tgl) => { if (!tgl) return "—"; const d = new Date(tgl + "T00:00:00"); return isNaN(d) ? "—" : new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "numeric", month: "short" }).format(d); };
const waLink = (tel) => { const d = (tel || "").replace(/\D/g, ""); if (!d) return null; const n = d.startsWith("0") ? "62" + d.slice(1) : d.startsWith("62") ? d : "62" + d; return `https://wa.me/${n}`; };
const telLink = (tel) => { const d = (tel || "").replace(/[^\d+]/g, ""); return d ? `tel:${d}` : null; };

/* ---------- geo: jarak & arah ---------- */
const toRad = (d) => (d * Math.PI) / 180;
function jarakMeter(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function bearingDerajat(lat1, lon1, lat2, lon2) {
  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) - Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lon2 - lon1));
  return (((Math.atan2(y, x) * 180) / Math.PI) + 360) % 360;
}
/* ---------- tautan Google Maps ---------- */
const mapsCari = (lat, lng) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
const mapsRute = (lat, lng, moda = "walking") =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${moda}`;

/* ---------- kondisi harian jamaah ---------- */
const KONDISI = {
  sehat:    { label: "Sehat",           warna: "#0f5c37", latar: "#e7f0ea", ikon: Smile },
  kurang:   { label: "Kurang sehat",    warna: "#9a7620", latar: "#f4ead0", ikon: Thermometer },
  sakit:    { label: "Sakit",           warna: "#b23b3b", latar: "#f7e7e6", ikon: HeartPulse },
  perhatian:{ label: "Butuh perhatian", warna: "#2f7fa8", latar: "#e6f0f5", ikon: Activity },
};

const MATA_ANGIN = ["Utara", "Timur Laut", "Timur", "Tenggara", "Selatan", "Barat Daya", "Barat", "Barat Laut"];
const arahMataAngin = (deg) => MATA_ANGIN[Math.round(deg / 45) % 8];
const formatJarak = (m) => (m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`);

/* ---------- seed ---------- */
const SEED_TITIK_PENTING = [
  { id: 1, nama: "Masjidil Haram", catatan: "Titik referensi utama Makkah.", lat: 21.4225, lng: 39.8262, gambar: null },
  { id: 2, nama: "Masjid Nabawi", catatan: "Titik referensi utama Madinah.", lat: 24.4672, lng: 39.6112, gambar: null },
];
const SEED_TITIK_KUMPUL = [
  { id: 1, nama: "Pintu King Abdul Aziz (Gate 1)", catatan: "Titik kumpul setelah thawaf.", lat: 21.4218, lng: 39.8256, gambar: null },
];
const SEED_DOA = [
  { id: 1, kategori: "Ihram", judul: "Niat Umroh", arab: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً", latin: "Labbaika Allahumma 'umratan", arti: "Aku penuhi panggilan-Mu ya Allah untuk berumroh.", catatan: "Dibaca saat memulai ihram di miqat.", berkas: null },
  { id: 2, kategori: "Talbiyah", judul: "Bacaan Talbiyah", arab: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ", latin: "Labbaika Allahumma labbaik, labbaika laa syariika laka labbaik", arti: "Aku penuhi panggilan-Mu ya Allah, tiada sekutu bagi-Mu.", catatan: "Diperbanyak sejak ihram hingga mulai thawaf.", berkas: null },
  { id: 3, kategori: "Thawaf", judul: "Doa Antara Rukun Yamani dan Hajar Aswad", arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", latin: "Rabbanaa aatinaa fid-dunyaa hasanah wa fil-aakhirati hasanah wa qinaa 'adzaaban-naar", arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.", catatan: "", berkas: null },
];
const SEED_PERIODE = [
  { id: 1, nama: "Umroh Reguler Agustus", jenis: "Umroh", tahun: "2026", berangkat: "2026-08-12", pulang: "2026-08-21", catatan: "Rombongan A & B, 2 pembimbing.", dibuat: "2026-07-18T00:00:00.000Z" },
];
const SEED_KAT_DOA = ["Ihram", "Talbiyah", "Thawaf", "Sa'i", "Ziarah", "Harian"];
const SEED_KAT_FIQH = ["Rukun & Wajib", "Larangan Ihram", "Dam & Denda", "Thawaf", "Sa'i", "Wanita"];
const SEED_FIQH = [
  { id: 1, kategori: "Rukun & Wajib", judul: "Rukun Umroh", isi: "Rukun umroh ada empat: (1) ihram disertai niat, (2) thawaf, (3) sa'i, (4) tahallul (mencukur atau memotong rambut). Bila salah satu rukun ditinggalkan, umroh tidak sah dan tidak dapat diganti dengan dam.", dalil: "Disepakati mayoritas ulama; sebagian menambahkan tertib sebagai rukun.", rujukan: "Fikih Manasik — mazhab Syafi'i", catatan: "Tekankan pada jamaah saat manasik: rukun tidak bisa diganti denda.", berkas: null },
  { id: 2, kategori: "Larangan Ihram", judul: "Larangan Selama Ihram", isi: "Antara lain: memakai pakaian berjahit bagi laki-laki, menutup kepala bagi laki-laki, menutup wajah dan telapak tangan bagi perempuan, memakai wewangian, memotong kuku dan rambut, berburu binatang darat, memotong tanaman tanah haram, melangsungkan akad nikah, dan berhubungan suami istri.", dalil: "QS. Al-Baqarah: 197 dan hadis-hadis terkait.", rujukan: "Fikih Manasik", catatan: "Ingatkan sebelum miqat, terutama soal wewangian di sabun dan tisu basah.", berkas: null },
  { id: 3, kategori: "Dam & Denda", judul: "Dam karena Meninggalkan Wajib", isi: "Meninggalkan kewajiban umroh (misalnya ihram tidak dari miqat) tidak membatalkan umroh, tetapi mewajibkan dam berupa menyembelih seekor kambing. Bila tidak mampu, diganti puasa sepuluh hari: tiga hari di tanah suci dan tujuh hari setelah kembali.", dalil: "QS. Al-Baqarah: 196.", rujukan: "Fikih Manasik", catatan: "Bedakan dengan rukun yang tidak bisa diganti dam.", berkas: null },
];
const SEED_LAPORAN = [
  { id: 1, jenis: "Kegiatan", judul: "Manasik hari pertama selesai", isi: "Manasik berjalan lancar, dihadiri 3 jamaah. Materi thawaf & sa'i tersampaikan. Jamaah Aminah perlu perhatian ekstra karena kursi roda.", pencatat: "Ustadz Fulan", waktuISO: "2026-08-05T10:15:00.000Z", status: "lokal" },
];
const SEED = [
  { id: 1, foto: null, nama: "Hj. Aminah Suryani", jenisKelamin: "Perempuan", noPaspor: "C4839201", telepon: "0812-3456-7890", alamat: "Bogor, Jawa Barat", rombongan: "A", tempatLahir: "Cianjur", tanggalLahir: "1955-04-12", riwayatPenyakit: "Hipertensi, konsumsi Amlodipine rutin pagi hari.", pendamping: "", kursiRoda: true, catatan: "Perlu bantuan naik-turun bus. Kamar dekat lift.", relasi: [{ id: 2, hubungan: "Suami" }, { id: 3, hubungan: "Anak" }] },
  { id: 2, foto: null, nama: "H. Abdul Karim", jenisKelamin: "Laki-laki", noPaspor: "C5120388", telepon: "0813-9988-1122", alamat: "Depok, Jawa Barat", rombongan: "A", tempatLahir: "Bandung", tanggalLahir: "1968-09-30", riwayatPenyakit: "Diabetes tipe 2. Bawa insulin, simpan di kotak dingin.", pendamping: "", kursiRoda: false, catatan: "Jamaah pertama kali umroh.", relasi: [{ id: 1, hubungan: "Istri" }, { id: 3, hubungan: "Anak" }] },
  { id: 3, foto: null, nama: "Siti Rohmah", jenisKelamin: "Perempuan", noPaspor: "C6001547", telepon: "0857-2211-3344", alamat: "Sukabumi, Jawa Barat", rombongan: "B", tempatLahir: "Sukabumi", tanggalLahir: "1990-01-25", riwayatPenyakit: "Tidak ada.", pendamping: "", kursiRoda: false, catatan: "", relasi: [{ id: 1, hubungan: "Ibu" }, { id: 2, hubungan: "Ayah" }] },
];
const SEED_AGENDA = [
  { id: 1, tanggal: "2026-08-05", waktu: "08:00", judul: "Manasik Umroh", lokasi: "Aula KBIH Ibnu Aqil, Bogor", keterangan: "Pembekalan tata cara umroh & pembagian kelompok." },
  { id: 2, tanggal: "2026-08-12", waktu: "14:00", judul: "Berkumpul & Keberangkatan", lokasi: "Bandara Soekarno-Hatta, Terminal 3", keterangan: "Kumpul 4 jam sebelum boarding.", lat: -6.1256, lng: 106.6558 },
  { id: 3, tanggal: "2026-08-13", waktu: "10:00", judul: "Ziarah Kota Madinah", lokasi: "Masjid Nabawi & sekitarnya", keterangan: "Ziarah Raudhah, Masjid Quba, Jabal Uhud." },
  { id: 4, tanggal: "2026-08-16", waktu: "23:00", judul: "Pelaksanaan Umroh", lokasi: "Masjidil Haram, Makkah", keterangan: "Miqat, thawaf, sa'i, tahallul." },
];
const SEED_SEATS = { "5A": 1, "5B": 2 };
const SEED_ABSEN = { 1: { 1: "hadir", 2: "hadir", 3: "izin" } };

const STAT = {
  hadir: { label: "Hadir", color: C.green, bg: C.greenSoft, icon: CheckCircle2, huruf: "H" },
  izin: { label: "Izin", color: C.goldDeep, bg: C.goldSoft, icon: MinusCircle, huruf: "I" },
  tidak: { label: "Tidak", color: C.danger, bg: C.dangerSoft, icon: XCircle, huruf: "T" },
};

/* ---------- shared UI ---------- */
function DualClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const Item = ({ label, tz, accent }) => (
    <div className="jam-item" style={{ minWidth: 176 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: accent }} />
        <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: ".06em", color: "#d7e4da", textTransform: "uppercase" }}>{label}</span>
      </div>
      <div className="jam-angka" style={{ fontSize: 38, fontWeight: 800, lineHeight: 1, color: "#fff", fontVariantNumeric: "tabular-nums", letterSpacing: "-.015em" }}>{idTime(tz, now)}</div>
      <div style={{ fontSize: 12, color: "#b9cdc0", marginTop: 5 }}>{idDate(tz, now)}</div>
    </div>
  );
  return (
    <div className="jam-blok" style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Moon size={16} color={C.gold} className="sembunyi-hp" />
        <Item label="Makkah · AST" tz="Asia/Riyadh" accent={C.gold} />
      </div>
      <div style={{ width: 1, height: 64, background: "#ffffff22" }} />
      <Item label="WIB · Jakarta" tz="Asia/Jakarta" accent="#7fd0a3" />
    </div>
  );
}
function Avatar({ foto, nama, size = 48 }) {
  if (foto) return <img src={foto} alt={nama} style={{ width: size, height: size, borderRadius: 14, objectFit: "cover", objectPosition: "center top", border: `2px solid ${C.border}` }} />;
  return <div style={{ width: size, height: size, borderRadius: 14, background: C.greenSoft, color: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.34, border: `2px solid ${C.green}22` }}>{inisial(nama)}</div>;
}
function Badge({ children, bg, color, icon: Icon }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: bg, color, fontSize: 11.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>{Icon && <Icon size={12} />} {children}</span>;
}
function ContactBtns({ tel, size = 34, stop }) {
  const wa = waLink(tel), t = telLink(tel);
  const s = { width: size, height: size, borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" };
  const click = (e) => stop && e.stopPropagation();
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <a href={wa || undefined} onClick={click} target="_blank" rel="noreferrer" title="Chat WhatsApp" style={{ ...s, background: wa ? "#e4f4ea" : C.bg, color: wa ? "#1f9d55" : C.border, pointerEvents: wa ? "auto" : "none" }}><MessageCircle size={17} /></a>
      <a href={t || undefined} onClick={click} title="Telepon" style={{ ...s, background: t ? C.greenSoft : C.bg, color: t ? C.green : C.border, pointerEvents: t ? "auto" : "none" }}><Phone size={16} /></a>
    </div>
  );
}
function Section({ title }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "22px 0 14px" }}><span style={{ width: 4, height: 16, background: C.gold, borderRadius: 4 }} /><span style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: ".05em", textTransform: "uppercase", color: C.ink }}>{title}</span></div>;
}
const inputStyle = { width: "100%", padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 11, background: "#fff" };

/* Didefinisikan di tingkat modul — kalau ditaruh di dalam komponen,
   React membuat ulang kotak isian tiap ketikan dan keyboard tertutup. */
const Label = ({ children, req }) => (
  <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>
    {children}{req && <span style={{ color: C.danger }}> *</span>}
  </label>
);
const Grid = ({ children }) => <div className="grid2">{children}</div>;
function Modal({ children, onClose, width = 460 }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#0a271799", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 50 }}>
      <div className="fade" onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, width, maxWidth: "100%", maxHeight: "86vh", overflow: "auto", boxShadow: "0 24px 60px rgba(0,0,0,.3)" }}>{children}</div>
    </div>
  );
}

/* ---------- editor gambar: atur ukuran & posisi ---------- */
const RASIO = {
  potret:  { label: "Potret 3:4",  w: 3, h: 4 },
  persegi: { label: "Persegi 1:1", w: 1, h: 1 },
  lanskap: { label: "Lanskap 4:3", w: 4, h: 3 },
};
const LEBAR_PRATINJAU = 262;

function EditorGambar({ sumber, rasioAwal = "potret", judul = "Atur Foto", onBatal, onSelesai }) {
  const [rasio, setRasio] = useState(rasioAwal);
  const [zoom, setZoom] = useState(1);
  const [geser, setGeser] = useState({ x: 0, y: 0 });
  const [gbr, setGbr] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  const seret = useRef(null);

  useEffect(() => {
    const i = new Image();
    i.onload = () => setGbr(i);
    i.src = sumber;
  }, [sumber]);

  const R = RASIO[rasio];
  const TINGGI_PRATINJAU = Math.round((LEBAR_PRATINJAU * R.h) / R.w);

  useEffect(() => { setGeser({ x: 0, y: 0 }); setZoom(1); }, [rasio]);

  if (!gbr) {
    return (
      <Modal onClose={onBatal} width={360}>
        <div style={{ padding: 40, textAlign: "center", color: C.muted, fontSize: 13 }}>
          <Loader2 size={22} className="spin" color={C.green} />
          <div style={{ marginTop: 10 }}>Memuat gambar…</div>
        </div>
      </Modal>
    );
  }

  const skalaDasar = Math.max(LEBAR_PRATINJAU / gbr.width, TINGGI_PRATINJAU / gbr.height);
  const skala = skalaDasar * zoom;
  const lebarTampil = gbr.width * skala;
  const tinggiTampil = gbr.height * skala;
  const batasX = Math.max(0, (lebarTampil - LEBAR_PRATINJAU) / 2);
  const batasY = Math.max(0, (tinggiTampil - TINGGI_PRATINJAU) / 2);
  const jepit = (n, b) => Math.max(-b, Math.min(b, n));
  const gx = jepit(geser.x, batasX);
  const gy = jepit(geser.y, batasY);

  const mulaiSeret = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    seret.current = { px: e.clientX, py: e.clientY, ax: gx, ay: gy };
  };
  const jalanSeret = (e) => {
    if (!seret.current) return;
    const d = seret.current;
    setGeser({ x: jepit(d.ax + (e.clientX - d.px), batasX), y: jepit(d.ay + (e.clientY - d.py), batasY) });
  };
  const akhirSeret = () => { seret.current = null; };

  const simpan = async () => {
    setSibuk(true);
    try {
      // Ukuran hasil akhir — sisi terpanjang 1000 px
      const panjang = 1000;
      const keluarW = R.w >= R.h ? panjang : Math.round((panjang * R.w) / R.h);
      const keluarH = R.h >= R.w ? panjang : Math.round((panjang * R.h) / R.w);

      const sw = LEBAR_PRATINJAU / skala;
      const sh = TINGGI_PRATINJAU / skala;
      const cx = gbr.width / 2 - gx / skala;
      const cy = gbr.height / 2 - gy / skala;
      let sx = Math.max(0, Math.min(gbr.width - sw, cx - sw / 2));
      let sy = Math.max(0, Math.min(gbr.height - sh, cy - sh / 2));

      const kanvas = document.createElement("canvas");
      kanvas.width = keluarW; kanvas.height = keluarH;
      const ctx = kanvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, keluarW, keluarH);
      ctx.drawImage(gbr, sx, sy, sw, sh, 0, 0, keluarW, keluarH);

      let mutu = 0.75;
      let hasil = kanvas.toDataURL("image/jpeg", mutu);
      while (hasil.length > 300 * 1024 && mutu > 0.35) {
        mutu -= 0.1;
        hasil = kanvas.toDataURL("image/jpeg", mutu);
      }
      onSelesai({
        nama: "foto.jpg",
        tipe: "image/jpeg",
        ukuran: Math.round((hasil.length * 3) / 4),
        data: hasil,
      });
    } catch (e) {
      alert("Gagal memproses gambar. Coba foto lain.");
    }
    setSibuk(false);
  };

  return (
    <Modal onClose={onBatal} width={360}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700 }}>{judul}</h3>
          <button className="btn iconbtn" onClick={onBatal} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>

        {/* pilihan bentuk */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14, justifyContent: "center" }}>
          {Object.entries(RASIO).map(([k, v]) => {
            const on = rasio === k;
            return (
              <button key={k} className="btn" onClick={() => setRasio(k)}
                style={{ flex: 1, justifyContent: "center", background: on ? C.green : "#fff", color: on ? "#fff" : C.muted, border: `1px solid ${on ? C.green : C.border}`, padding: "7px 6px", borderRadius: 10, fontSize: 11.5 }}>
                {v.label}
              </button>
            );
          })}
        </div>

        {/* area pratinjau */}
        <div
          onPointerDown={mulaiSeret} onPointerMove={jalanSeret}
          onPointerUp={akhirSeret} onPointerCancel={akhirSeret} onPointerLeave={akhirSeret}
          style={{
            width: LEBAR_PRATINJAU, height: TINGGI_PRATINJAU, margin: "0 auto",
            overflow: "hidden", position: "relative", borderRadius: 14,
            background: "#111", cursor: "grab", touchAction: "none",
            border: `2px solid ${C.border}`,
          }}>
          <img src={sumber} alt="" draggable={false}
            style={{
              position: "absolute", left: "50%", top: "50%",
              width: lebarTampil, height: tinggiTampil, maxWidth: "none",
              transform: `translate(calc(-50% + ${gx}px), calc(-50% + ${gy}px))`,
              userSelect: "none", pointerEvents: "none",
            }} />
        </div>
        <div style={{ textAlign: "center", fontSize: 11.5, color: C.muted, marginTop: 8 }}>
          Seret gambar untuk menggeser posisi
        </div>

        {/* pembesaran */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
          <ImagePlus size={16} color={C.muted} />
          <input type="range" min="1" max="3" step="0.02" value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: C.green }} />
          <span style={{ fontSize: 12, color: C.muted, minWidth: 34, textAlign: "right" }}>{zoom.toFixed(1)}×</span>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
          <button className="btn" onClick={onBatal} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "10px 18px", borderRadius: 11 }}>Batal</button>
          <button className="btn" onClick={simpan} disabled={sibuk} style={{ background: C.green, color: "#fff", padding: "10px 20px", borderRadius: 11 }}>
            {sibuk ? <Loader2 size={16} className="spin" /> : <Check size={16} />} {sibuk ? "Memproses…" : "Gunakan"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------- unggah gambar ---------- */
function UploadGambar({ nilai, onChange, tinggi = 130, label = "Unggah gambar", rasio = "potret" }) {
  const ref = useRef(null);
  const [sibuk, setSibuk] = useState(false);
  const [mentah, setMentah] = useState(null);
  const pilih = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Pilih berkas gambar (JPG/PNG).");
    if (file.size > 12 * 1024 * 1024) return alert("Ukuran gambar maksimal 12 MB.");
    setSibuk(true);
    const rd = new FileReader();
    rd.onload = () => { setMentah(rd.result); setSibuk(false); };
    rd.onerror = () => { alert("Gagal membaca gambar."); setSibuk(false); };
    rd.readAsDataURL(file);
    e.target.value = "";
  };
  return (
    <div>
      {mentah && (
        <EditorGambar sumber={mentah} rasioAwal={rasio} judul="Atur Gambar"
          onBatal={() => setMentah(null)}
          onSelesai={(hasil) => { onChange(hasil); setMentah(null); }} />
      )}
      <input ref={ref} type="file" accept="image/*" onChange={pilih} style={{ display: "none" }} />
      {nilai ? (
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
          <img src={nilai.data} alt={nilai.nama} style={{ width: "100%", height: tinggi, objectFit: "cover", display: "block" }} />
          <button className="btn" onClick={() => onChange(null)} title="Hapus gambar" style={{ position: "absolute", top: 8, right: 8, background: "#0a2717cc", color: "#fff", width: 28, height: 28, borderRadius: 99, padding: 0, justifyContent: "center" }}><X size={15} /></button>
          <button className="btn" onClick={() => ref.current?.click()} style={{ position: "absolute", bottom: 8, right: 8, background: "#ffffffee", color: C.green, padding: "6px 11px", borderRadius: 9, fontSize: 12 }}><Camera size={14} /> Ganti</button>
        </div>
      ) : (
        <button className="btn" onClick={() => ref.current?.click()} disabled={sibuk} style={{ width: "100%", justifyContent: "center", flexDirection: "column", gap: 6, padding: "20px 14px", borderRadius: 12, border: `1.5px dashed ${C.border}`, background: C.bg, color: C.muted }}>
          {sibuk ? <Loader2 size={22} color={C.green} className="spin" /> : <ImagePlus size={22} color={C.green} />}
          <span style={{ fontSize: 13 }}>{sibuk ? "Mengunggah…" : label}</span>
          <span style={{ fontSize: 11, fontWeight: 500 }}>Bisa diatur ukuran & posisinya</span>
        </button>
      )}
    </div>
  );
}

/* ---------- tautan berkas (PDF/dokumen) ----------
   Berkas besar tidak diunggah ke server, cukup ditautkan
   dari Google Drive agar tetap gratis dan ringan.
-------------------------------------------------- */
function TautanBerkas({ nilai, onChange, label = "Tautan berkas (PDF)", petunjuk }) {
  const [buka, setBuka] = useState(false);
  const [url, setUrl] = useState("");
  const [nama, setNama] = useState("");

  const simpan = () => {
    const rapi = rapikanTautan(url);
    if (!rapi) return alert("Tempelkan tautan berkasnya dulu.");
    onChange({ nama: nama.trim() || "Berkas materi", tipe: "tautan", data: rapi });
    setBuka(false); setUrl(""); setNama("");
  };

  if (nilai) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", border: `1px solid ${C.border}`, borderRadius: 12, background: "#fff" }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: C.dangerSoft, color: C.danger, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><FileText size={18} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{nilai.nama}</div>
          <div style={{ fontSize: 11.5, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{nilai.data}</div>
        </div>
        <button className="btn iconbtn" onClick={() => bukaBerkas(nilai)} title="Buka" style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Download size={15} /></button>
        <button className="btn iconbtn" onClick={() => onChange(null)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><X size={15} /></button>
      </div>
    );
  }

  if (!buka) {
    return (
      <button className="btn" onClick={() => setBuka(true)} style={{ width: "100%", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 12, border: `1.5px dashed ${C.border}`, background: C.bg, color: C.muted }}>
        <LinkIcon size={18} color={C.green} /> <span style={{ fontSize: 13 }}>{label}</span>
      </button>
    );
  }

  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 13, background: "#fff" }}>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 9, lineHeight: 1.5 }}>
        {petunjuk || "Unggah berkas ke Google Drive, klik kanan → Bagikan → ubah ke \u201cSiapa saja yang memiliki link\u201d, lalu tempelkan tautannya di sini."}
      </div>
      <input className="field" style={{ ...inputStyle, marginBottom: 8 }} value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama berkas (cth. Materi Manasik Hari 1)" />
      <input className="field" autoFocus style={{ ...inputStyle, marginBottom: 10 }} value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && simpan()} placeholder="Tempel tautan di sini…" />
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button className="btn" onClick={() => { setBuka(false); setUrl(""); setNama(""); }} style={{ background: C.bg, color: C.muted, padding: "8px 14px", borderRadius: 10, fontSize: 12.5 }}>Batal</button>
        <button className="btn" onClick={simpan} style={{ background: C.green, color: "#fff", padding: "8px 16px", borderRadius: 10, fontSize: 12.5 }}><Check size={15} /> Simpan tautan</button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* ---------- gerbang: cek login dulu ---------- */
export default function App() {
  const pengguna = usePengguna();

  if (pengguna === undefined) return <LayarMuat pesan="Memeriksa sesi…" />;
  if (!pengguna) return <LoginGate logo={LOGO} />;
  return <AppInti pengguna={pengguna} />;
}

function LayarMuat({ pesan }) {
  return (
    <div className="kbih-root" style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <style>{STYLE}</style>
      <img src={LOGO} alt="KBIH Ibnu Aqil" style={{ width: 72, height: 72, borderRadius: 18, border: `1px solid ${C.border}` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 9, color: C.muted, fontSize: 13.5 }}>
        <Loader2 size={17} className="spin" color={C.green} /> {pesan}
      </div>
    </div>
  );
}

function AppInti({ pengguna }) {
  const [periode, setPeriode, siapPeriode] = useKoleksiTersinkron("periode", SEED_PERIODE);
  const [idAktif, setIdAktif] = useState(() => {
    try { return localStorage.getItem("kbih-periode") || null; } catch { return null; }
  });

  // Pastikan periode aktif selalu ada
  useEffect(() => {
    if (!siapPeriode || !periode.length) return;
    const ada = periode.some((p) => String(p.id) === String(idAktif));
    if (!ada) pilihPeriode(periode[0].id);
  }, [siapPeriode, periode, idAktif]);

  const pilihPeriode = (id) => {
    setIdAktif(String(id));
    try { localStorage.setItem("kbih-periode", String(id)); } catch { /* abaikan */ }
  };

  const akunSaya = useAkunSaya(pengguna.uid);
  const peranSaya = akunSaya === undefined ? "memuat" : (akunSaya?.peran || "Pembimbing");
  const bolehKelola = peranSaya !== "Jamaah";

  // Akun jamaah terkunci pada periode tempat datanya berada
  const pid = bolehKelola
    ? String(idAktif || (periode[0] && periode[0].id) || "kosong")
    : String(akunSaya?.periodeId || idAktif || (periode[0] && periode[0].id) || "kosong");
  const periodeAktif = periode.find((p) => String(p.id) === pid) || null;

  // --- Data per periode ---
  const [list, setList, siapList] = useKoleksiTersinkron(bolehKelola ? ["periode", pid, "jamaah"] : null, SEED);
  // Daftar ringkas (nama, foto, telepon) — boleh dibaca akun jamaah
  const [direktori] = useKoleksiTersinkron(pid !== "kosong" ? ["periode", pid, "direktori"] : null, []);
  // Data pribadi milik akun jamaah yang sedang login
  const [sayaJamaah, simpanSayaJamaah, siapSaya] = useDokumenMentah(
    !bolehKelola && akunSaya?.jamaahId ? ["periode", pid, "jamaah", String(akunSaya.jamaahId)] : null
  );
  const [agenda, setAgenda] = useKoleksiTersinkron(["periode", pid, "agenda"], SEED_AGENDA);
  const [seats, setSeats] = useDataTersinkron(pid !== "kosong" ? ["periode", pid, "data", "kursi"] : null, SEED_SEATS, bolehKelola);
  const [hotel, setHotel] = useDataTersinkron(pid !== "kosong" ? ["periode", pid, "data", "hotel"] : null, { kamar: [] }, bolehKelola);
  const [absen, setAbsen] = useDataTersinkron(bolehKelola ? ["periode", pid, "data", "absensi"] : null, SEED_ABSEN);
  const [titikPenting, setTitikPenting] = useKoleksiTersinkron(pid !== "kosong" ? ["periode", pid, "titikPenting"] : null, bolehKelola ? SEED_TITIK_PENTING : []);
  const [titikKumpul, setTitikKumpul] = useKoleksiTersinkron(pid !== "kosong" ? ["periode", pid, "titikKumpul"] : null, bolehKelola ? SEED_TITIK_KUMPUL : []);
  const [laporan, setLaporan] = useKoleksiTersinkron(bolehKelola ? ["periode", pid, "laporan"] : null, SEED_LAPORAN);

  // --- Data bersama semua periode ---
  const [doa, setDoa] = useKoleksiTersinkron("doa", SEED_DOA);
  const [fiqh, setFiqh] = useKoleksiTersinkron("fiqh", SEED_FIQH);
  const [katDoa, setKatDoa] = useDataTersinkron("kategoriDoa", SEED_KAT_DOA);
  const [katFiqh, setKatFiqh] = useDataTersinkron("kategoriFiqh", SEED_KAT_FIQH);
  const [tg, setTg] = useDataTersinkron("telegram", TG_KOSONG);

  const [page, setPage] = useState("periode");
  const pasang = usePemasangan();
  // Nama yang dipakai pada laporan & catatan — ambil dari nama akun, bukan email
  const namaSaya = (akunSaya?.nama || "").trim() || pengguna.email?.split("@")[0] || "Pembimbing";

  // Pembimbing menyalin daftar ringkas agar bisa dibaca akun jamaah
  useEffect(() => {
    if (!bolehKelola || !siapList || pid === "kosong") return;
    const t = setTimeout(() => sinkronDirektori(pid, list), 800);
    return () => clearTimeout(t);
  }, [bolehKelola, siapList, pid, list]);
  const lokasi = useLokasiGlobal();
  const [darurat, setDarurat] = useDataTersinkron("darurat", { kontak: [] });

  const orangPeriode = bolehKelola ? list : direktori;
  const byId = (id) => orangPeriode.find((j) => String(j.id) === String(id));

  const navLengkap = [
    { id: "periode", label: "Periode", icon: LayoutGrid },
    { id: "jamaah", label: "Jamaah", icon: Users },
    { id: "kontak", label: "Kontak", icon: Phone },
    { id: "bus", label: "Bis & Hotel", icon: Bus },
    { id: "agenda", label: "Agenda", icon: CalendarDays },
    { id: "absensi", label: "Absensi", icon: ClipboardCheck },
    { id: "lokasi", label: "Lokasi", icon: Navigation },
    { id: "doa", label: "Doa", icon: BookOpen },
    { id: "fiqh", label: "Fiqh", icon: Scale },
    { id: "laporan", label: "Laporan", icon: FileText },
    { id: "akun", label: "Pengaturan", icon: Settings },
    { id: "darurat", label: "Darurat", icon: AlertOctagon, merah: true },
  ];
  const NAV_JAMAAH_KHUSUS = [
    { id: "kartuku", label: "Kartu Saya", icon: ContactRound },
    { id: "kontak", label: "Jamaah", icon: Users },
    { id: "bus", label: "Bis & Hotel", icon: Bus },
    { id: "agenda", label: "Agenda", icon: CalendarDays },
    { id: "lokasi", label: "Lokasi", icon: Navigation },
    { id: "doa", label: "Doa", icon: BookOpen },
    { id: "fiqh", label: "Fiqh", icon: Scale },
    { id: "darurat", label: "Darurat", icon: AlertOctagon, merah: true },
  ];
  const nav = bolehKelola ? navLengkap : NAV_JAMAAH_KHUSUS;

  // Jika halaman aktif tidak boleh dibuka peran ini, alihkan
  useEffect(() => {
    if (peranSaya === "memuat") return;
    if (!nav.some((n) => n.id === page)) setPage(bolehKelola ? "periode" : "kartuku");
  }, [peranSaya, page]);
  // Halaman yang butuh periode aktif
  const perluPeriode = bolehKelola ? ["jamaah", "kontak", "bus", "agenda", "absensi", "lokasi", "laporan"] : [];

  return (
    <div className="kbih-root" style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{STYLE}</style>

      <header style={{ background: `linear-gradient(115deg, ${C.greenDeep} 0%, ${C.green} 62%, #12693e 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .14, backgroundImage: "radial-gradient(circle at 12% 20%, #ffffff33 0 2px, transparent 2px), radial-gradient(circle at 80% 60%, #ffffff22 0 2px, transparent 2px)", backgroundSize: "44px 44px" }} />
        <div className="hdr-wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 6, boxShadow: "0 6px 18px rgba(0,0,0,.18)" }}>
              <img src={LOGO} alt="KBIH Ibnu Aqil" className="kop-logo" style={{ width: 56, height: 56, display: "block", borderRadius: 10 }} />
            </div>
            <div>
              <div className="serif kop-nama" style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>KBIH Ibnu Aqil</div>
              <div className="kop-tagline" style={{ color: C.goldSoft, fontSize: 12.5, fontWeight: 500 }}>Melayani dengan Ikhlas, Membimbing dengan Amanah</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <DualClock />
            <div style={{ display: "flex", alignItems: "center", gap: 9, paddingLeft: 16, borderLeft: "1px solid #ffffff22" }}>
              {lokasi.aktif && (
                <span title="Lokasi sedang aktif" style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#ffffff22", color: "#7fd0a3", padding: "6px 10px", borderRadius: 99, fontSize: 11.5, fontWeight: 700 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: "#7fd0a3" }} />
                  <span className="sembunyi-hp">Lokasi aktif</span>
                </span>
              )}
              {pasang.bisa && (
                <button className="btn" onClick={pasang.pasang} title="Pasang aplikasi di HP"
                  style={{ background: C.gold, color: "#3a2c05", padding: "8px 13px", borderRadius: 11, fontSize: 12.5 }}>
                  <DownloadIcon size={15} /> <span className="sembunyi-hp">Pasang Aplikasi</span>
                </button>
              )}
              <div style={{ textAlign: "right", lineHeight: 1.3 }}>
                <div className="sembunyi-hp" style={{ fontSize: 11, color: "#b9cdc0" }}>Masuk sebagai</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pengguna.email}</div>
              </div>
              <button className="btn" onClick={() => { if (window.confirm("Keluar dari aplikasi?")) keluar(); }} title="Keluar"
                style={{ background: "#ffffff1a", color: "#fff", padding: 10, borderRadius: 11 }}><LogOut size={16} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* NAV */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 16px", display: "flex", gap: 4, overflowX: "auto" }} className="kbih-scroll">
          {nav.map((n) => {
            const on = page === n.id;
            return (
              <button key={n.id} className="btn navtab" onClick={() => setPage(n.id)}
                style={{ position: "relative", background: "transparent",
                  color: n.merah ? C.danger : (on ? C.green : C.muted),
                  padding: "14px 16px",
                  borderBottom: `3px solid ${on ? (n.merah ? C.danger : C.green) : "transparent"}`,
                  borderRadius: 0, fontWeight: on || n.merah ? 800 : 600, whiteSpace: "nowrap" }}>
                <n.icon size={17} /> {n.label}
                {n.alert && <span style={{ position: "absolute", top: 9, right: 6, width: 8, height: 8, borderRadius: 99, background: C.danger }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pita periode aktif */}
      {periodeAktif && page !== "periode" && (
        <div style={{ background: C.greenSoft, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "9px 14px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Badge bg={periodeAktif.jenis === "Haji" ? C.goldSoft : "#fff"} color={periodeAktif.jenis === "Haji" ? C.goldDeep : C.green}>
              {periodeAktif.jenis}
            </Badge>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{periodeAktif.nama}</span>
            <span className="sembunyi-hp" style={{ fontSize: 12, color: C.muted }}>
              {periodeAktif.berangkat ? tglRingkas(periodeAktif.berangkat) : "—"}
            </span>
            <button className="btn" onClick={() => setPage("periode")}
              style={{ marginLeft: "auto", background: "#fff", color: C.green, border: `1px solid ${C.green}33`, padding: "6px 12px", borderRadius: 9, fontSize: 12 }}>
              <ArrowRightLeft size={14} /> Ganti
            </button>
          </div>
        </div>
      )}

      <main className="wrap">
        {page === "darurat" ? (
          <DaruratPage lokasi={lokasi} tg={tg} darurat={darurat || { kontak: [] }} setDarurat={setDarurat}
            pengguna={pengguna} periodeAktif={periodeAktif} setLaporan={setLaporan} />
        ) : page !== "periode" && perluPeriode.includes(page) && !periodeAktif ? (
          <TanpaPeriode onBuka={() => setPage("periode")} />
        ) : (
        <>
        {page === "periode" && (
          <PeriodePage periode={periode} setPeriode={setPeriode} idAktif={pid} bolehKelola={bolehKelola}
            onPilih={(id) => { pilihPeriode(id); setPage(bolehKelola ? "jamaah" : "agenda"); }} siap={siapPeriode} />
        )}
        {page === "akun" && <PengaturanPage pengguna={pengguna} akunSaya={akunSaya} list={list} pid={pid} periodeAktif={periodeAktif} />}
        {page === "kartuku" && (
          <KartuSayaPage saya={sayaJamaah} simpan={simpanSayaJamaah} siap={siapSaya}
            akunSaya={akunSaya} pengguna={pengguna} tg={tg} pid={pid} periodeAktif={periodeAktif} hotel={hotel}
            onDarurat={() => setPage("darurat")} />
        )}
        {page === "jamaah" && <JamaahPage list={list} setList={setList} pengguna={pengguna} namaSaya={namaSaya} />}
        {page === "kontak" && <KontakPage list={bolehKelola ? list : direktori} bolehKelola={bolehKelola} />}
        {page === "bus" && <BisHotelPage list={bolehKelola ? list : direktori} seats={seats || {}} setSeats={setSeats} hotel={hotel} setHotel={setHotel} byId={byId} bolehKelola={bolehKelola} />}
        {page === "agenda" && <AgendaPage agenda={agenda} setAgenda={setAgenda} list={list} absen={absen} setAbsen={setAbsen} bolehKelola={bolehKelola} />}
        {page === "absensi" && <AbsensiPage agenda={agenda} list={list} absen={absen} setAbsen={setAbsen} />}
        {page === "lokasi" && <LokasiPage titikPenting={titikPenting} setTitikPenting={setTitikPenting} titikKumpul={titikKumpul} setTitikKumpul={setTitikKumpul} lokasi={lokasi} bolehKelola={bolehKelola} />}
        {page === "doa" && <DoaPage doa={doa} setDoa={setDoa} kategori={katDoa || []} setKategori={setKatDoa} bolehKelola={bolehKelola} />}
        {page === "fiqh" && <FiqhPage fiqh={fiqh} setFiqh={setFiqh} kategori={katFiqh || []} setKategori={setKatFiqh} bolehKelola={bolehKelola} />}
        {page === "laporan" && <LaporanPage laporan={laporan} setLaporan={setLaporan} tg={{ ...tg, pencatat: tg?.pencatat || namaSaya }} setTg={setTg} agenda={agenda} list={list} absen={absen} periodeAktif={periodeAktif} />}
        </>
        )}
      </main>

      <footer style={{ textAlign: "center", padding: "0 20px 34px", color: C.muted, fontSize: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {siapList ? <><CheckCircle2 size={13} color={C.green} /> Data tersimpan & tersinkron ke server</> : <><Loader2 size={13} className="spin" /> Menghubungkan ke server…</>}
        </span>
        <div style={{ marginTop: 4 }}>KBIH Ibnu Aqil · Aplikasi Manajemen Jamaah</div>
      </footer>
    </div>
  );
}

/* ============================================================
   JAMAAH PAGE
   ============================================================ */
function JamaahPage({ list, setList, pengguna, namaSaya }) {
  const [view, setView] = useState("list");
  const [selId, setSelId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");
  const selected = list.find((j) => j.id === selId);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? list.filter((j) => [j.nama, j.rombongan, j.tempatLahir, j.telepon].join(" ").toLowerCase().includes(s)) : list;
  }, [list, q]);
  const stats = useMemo(() => ({
    total: list.length,
    lansia: list.filter((j) => (hitungUsia(j.tanggalLahir) ?? 0) >= 60).length,
    kursiRoda: list.filter((j) => j.kursiRoda).length,
  }), [list]);

  const remove = (id) => { if (window.confirm("Hapus data jamaah ini?")) { setList((l) => l.filter((j) => j.id !== id)); setView("list"); } };
  const save = (data) => {
    const clean = { ...data, relasi: (data.relasi || []).filter((r) => r.id).map((r) => ({ id: Number(r.id), hubungan: r.hubungan })) };
    if (clean.id) setList((l) => l.map((j) => (j.id === clean.id ? clean : j)));
    else { clean.id = Date.now(); setList((l) => [...l, clean]); }
    setSelId(clean.id); setView("detail");
  };

  const perbarui = (id, ubah) => setList((l) => l.map((j) => (j.id === id ? { ...j, ...ubah } : j)));

  if (view === "detail" && selected)
    return <JamaahDetail j={selected} list={list} pengguna={pengguna} namaSaya={namaSaya}
      onBack={() => setView("list")} onEdit={() => { setEditing(selected); setView("form"); }}
      onDelete={() => remove(selected.id)} onOpen={(id) => { setSelId(id); }}
      onPerbarui={(ubah) => perbarui(selected.id, ubah)} />;
  if (view === "form")
    return <JamaahForm initial={editing} list={list} onCancel={() => setView(editing ? "detail" : "list")} onSave={save} />;

  const StatCard = ({ label, value, icon: Icon, accent }) => (
    <div style={{ flex: 1, minWidth: 150, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: accent + "1a", color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={20} /></div>
      <div><div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{value}</div><div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{label}</div></div>
    </div>
  );

  return (
    <div className="fade">
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard label="Total jamaah" value={stats.total} icon={Users} accent={C.green} />
        <StatCard label="Lansia (60+)" value={stats.lansia} icon={Calendar} accent={C.gold} />
        <StatCard label="Pengguna kursi roda" value={stats.kursiRoda} icon={Accessibility} accent={C.blue} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div>
          <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Daftar Jamaah</h2>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Kelola profil dan kebutuhan tiap jamaah bimbingan.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} color={C.muted} style={{ position: "absolute", left: 12, top: 12 }} />
            <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama / rombongan…" style={{ padding: "10px 12px 10px 36px", border: `1px solid ${C.border}`, borderRadius: 12, width: 230, background: "#fff" }} />
          </div>
          <button className="btn" onClick={() => { setEditing(null); setView("form"); }} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}><Plus size={18} /> Tambah Jamaah</button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}>
          <Users size={32} color={C.border} /><p style={{ margin: "12px 0 0", fontWeight: 600 }}>Belum ada jamaah yang cocok.</p>
        </div>
      ) : (
        <div className="kartu-grid">
          {filtered.map((j) => {
            const u = labelUsia(hitungUsia(j.tanggalLahir));
            const relCount = (j.relasi || []).filter((r) => list.some((x) => x.id === Number(r.id))).length;
            return (
              <div key={j.id} className="card-hover" onClick={() => { setSelId(j.id); setView("detail"); }} role="button"
                style={{ cursor: "pointer", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar foto={j.foto} nama={j.nama} size={52} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 15.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.nama}</div>
                    <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>{j.jenisKelamin} · {u ? u.text : "usia —"}</div>
                  </div>
                  <span style={{ background: C.greenSoft, color: C.green, fontWeight: 800, fontSize: 12, padding: "4px 9px", borderRadius: 9 }}>Rmb {j.rombongan || "-"}</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {u?.tag && <Badge bg={C.goldSoft} color={C.goldDeep}>{u.tag}</Badge>}
                  {j.kursiRoda && <Badge bg={C.blueSoft} color={C.blue} icon={Accessibility}>Kursi roda</Badge>}
                  {j.riwayatPenyakit && !/^tidak ada/i.test(j.riwayatPenyakit.trim()) && <Badge bg={C.dangerSoft} color={C.danger} icon={Stethoscope}>Ada riwayat</Badge>}
                  {relCount > 0 && <Badge bg={C.greenSoft} color={C.green} icon={Link2}>Keluarga ({relCount})</Badge>}
                </div>
                {(() => {
                  const t = catatanTerakhir(j);
                  if (!t || !KONDISI[t.kondisi]) return null;
                  const k = KONDISI[t.kondisi];
                  const jml = (j.catatanHarian || []).length;
                  return (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: k.latar, borderRadius: 11, padding: "8px 11px", borderLeft: `3px solid ${k.warna}` }}>
                      <k.ikon size={15} color={k.warna} style={{ flexShrink: 0 }} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: k.warna, lineHeight: 1.3 }}>{k.label}</div>
                        <div style={{ fontSize: 10.5, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {t.tanggal ? tglRingkas(t.tanggal) : "—"} · {jml} catatan
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 11 }}>
                  <span style={{ fontSize: 12.5, color: C.muted, display: "inline-flex", alignItems: "center", gap: 5 }}><Phone size={13} /> {j.telepon || "—"}</span>
                  <ContactBtns tel={j.telepon} stop />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const jamWIB = (iso) => new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));
const jamAST = (iso) => new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Riyadh", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));

const catatanTerakhir = (j) => {
  const c = j?.catatanHarian || [];
  if (!c.length) return null;
  return [...c].sort((a, b) => (b.waktuISO || "").localeCompare(a.waktuISO || ""))[0];
};

function RelasiChips({ j, list, onOpen, dark }) {
  const rels = (j.relasi || []).map((r) => ({ ...r, ref: list.find((x) => x.id === Number(r.id)) })).filter((r) => r.ref);
  if (!rels.length) return null;
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {rels.map((r, i) => (
        <button key={i} className="btn" onClick={() => onOpen && onOpen(r.ref.id)}
          style={{ background: dark ? "#ffffff22" : C.greenSoft, color: dark ? "#fff" : C.green, padding: "5px 11px", borderRadius: 99, fontSize: 12.5 }}>
          <HeartHandshake size={13} /> {r.hubungan}: {r.ref.nama}
        </button>
      ))}
    </div>
  );
}

function JamaahDetail({ j, list, onBack, onEdit, onDelete, onOpen, onPerbarui, pengguna, namaSaya }) {
  const [tulisCatatan, setTulisCatatan] = useState(false);
  const [ubahCatatan, setUbahCatatan] = useState(null);
  const y = hitungUsia(j.tanggalLahir); const u = labelUsia(y);
  const Row = ({ icon: Icon, label, children, accent = C.green }) => (
    <div style={{ display: "flex", gap: 12, padding: "13px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 10, background: accent + "14", color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={17} /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: C.muted }}>{label}</div>
        <div style={{ fontSize: 14.5, marginTop: 3, lineHeight: 1.45 }}>{children}</div>
      </div>
    </div>
  );
  return (
    <div className="fade">
      <button className="btn" onClick={onBack} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Kembali ke daftar</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
        <div style={{ background: `linear-gradient(120deg, ${C.greenDeep}, ${C.green})`, padding: "22px 24px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <div style={{ background: "#fff", padding: 4, borderRadius: 18 }}><Avatar foto={j.foto} nama={j.nama} size={78} /></div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div className="serif" style={{ color: "#fff", fontSize: 26, fontWeight: 700 }}>{j.nama}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              <Badge bg="#ffffff26" color="#fff">Rombongan {j.rombongan || "-"}</Badge>
              {u && <Badge bg="#ffffff26" color="#fff">{u.text}{u.tag ? ` · ${u.tag}` : ""}</Badge>}
              {j.kursiRoda && <Badge bg="#ffffff26" color="#fff" icon={Accessibility}>Kursi roda</Badge>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ContactBtns tel={j.telepon} size={38} />
            <button className="btn" onClick={onEdit} style={{ background: C.gold, color: "#3a2c05", padding: "9px 16px", borderRadius: 11 }}><Pencil size={16} /> Ubah</button>
            <button className="btn iconbtn" onClick={onDelete} title="Hapus" style={{ background: "#ffffff1a", color: "#fff", padding: 10, borderRadius: 11 }}><Trash2 size={16} /></button>
          </div>
        </div>
        <div style={{ padding: "8px 24px 22px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0 40px" }}>
          <div>
            <Row icon={User} label="Jenis kelamin">{j.jenisKelamin || "—"}</Row>
            <Row icon={Calendar} label="Tempat, tanggal lahir">
              {j.tempatLahir || "—"}, {tglPanjang(j.tanggalLahir)}
              {y != null && <span style={{ display: "inline-block", marginLeft: 8, background: C.goldSoft, color: C.goldDeep, fontWeight: 700, fontSize: 12, padding: "2px 8px", borderRadius: 8 }}>Usia {y} tahun{y >= 60 ? " · Lansia" : ""}</span>}
            </Row>
            <Row icon={Phone} label="Telepon">{j.telepon || "—"}</Row>
            <Row icon={MapPin} label="Alamat">{j.alamat || "—"}</Row>
          </div>
          <div>
            <Row icon={Stethoscope} label="Riwayat penyakit" accent={C.danger}>{j.riwayatPenyakit || "Tidak ada catatan."}</Row>
            <Row icon={Link2} label="Keluarga & relasi">
              {(j.relasi || []).some((r) => list.some((x) => x.id === Number(r.id))) ? <RelasiChips j={j} list={list} onOpen={onOpen} /> : "Tidak ada relasi tercatat."}
            </Row>
            <Row icon={Accessibility} label="Kursi roda" accent={C.blue}>{j.kursiRoda ? "Ya — membutuhkan kursi roda" : "Tidak"}</Row>
            <Row icon={StickyNote} label="Catatan individu" accent={C.gold}>{j.catatan || "—"}</Row>
          </div>
        </div>
      </div>

      {/* ---------- Catatan & kondisi harian ---------- */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 20, marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <NotebookPen size={18} color={C.green} /> Catatan & Kondisi Harian
            </h3>
            <p style={{ margin: "3px 0 0", fontSize: 12.5, color: C.muted }}>Riwayat pemantauan jamaah dari hari ke hari.</p>
          </div>
          <button className="btn" onClick={() => { setUbahCatatan(null); setTulisCatatan(true); }}
            style={{ background: C.green, color: "#fff", padding: "9px 15px", borderRadius: 11, fontSize: 13 }}>
            <Plus size={16} /> Tambah Catatan
          </button>
        </div>

        <RiwayatCatatan j={j} onUbah={(c) => { setUbahCatatan(c); setTulisCatatan(true); }}
          onHapus={(id) => {
            if (!window.confirm("Hapus catatan ini?")) return;
            onPerbarui({ catatanHarian: (j.catatanHarian || []).filter((c) => c.id !== id) });
          }} />
      </div>

      {tulisCatatan && (
        <CatatanHarianModal
          awal={ubahCatatan}
          namaPencatat={namaSaya || ""}
          onClose={() => { setTulisCatatan(false); setUbahCatatan(null); }}
          onSimpan={(c) => {
            const lama = j.catatanHarian || [];
            const baru = c.id ? lama.map((x) => (x.id === c.id ? c : x)) : [...lama, { ...c, id: Date.now() }];
            onPerbarui({ catatanHarian: baru });
            setTulisCatatan(false); setUbahCatatan(null);
          }} />
      )}
    </div>
  );
}

function RiwayatCatatan({ j, onUbah, onHapus }) {
  const daftar = [...(j.catatanHarian || [])].sort((a, b) => (b.waktuISO || "").localeCompare(a.waktuISO || ""));

  if (!daftar.length) {
    return (
      <div style={{ border: `1px dashed ${C.border}`, borderRadius: 14, padding: "30px 18px", textAlign: "center", color: C.muted }}>
        <NotebookPen size={26} color={C.border} />
        <p style={{ margin: "10px 0 0", fontSize: 13, fontWeight: 600 }}>Belum ada catatan harian.</p>
        <p style={{ margin: "3px 0 0", fontSize: 12.5 }}>Catat kondisi jamaah setiap hari agar mudah dipantau.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {daftar.map((c) => {
        const k = KONDISI[c.kondisi] || KONDISI.sehat;
        return (
          <div key={c.id} style={{ display: "flex", gap: 12, padding: "13px 14px", background: C.bg, borderRadius: 13, borderLeft: `4px solid ${k.warna}` }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: k.latar, color: k.warna, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <k.ikon size={17} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: k.warna }}>{k.label}</span>
                <span style={{ fontSize: 11.5, color: C.muted }}>{c.tanggal ? tglRingkas(c.tanggal) : "—"}</span>
                {c.waktuISO && (
                  <span style={{ display: "inline-flex", gap: 7, fontSize: 11, color: C.muted, alignItems: "center" }}>
                    <span style={{ background: C.bg, padding: "2px 7px", borderRadius: 6 }}>WIB {jamWIB(c.waktuISO)}</span>
                    <span style={{ background: C.goldSoft, color: C.goldDeep, padding: "2px 7px", borderRadius: 6, fontWeight: 700 }}>AST {jamAST(c.waktuISO)}</span>
                  </span>
                )}
              </div>
              {c.isi && <div style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{c.isi}</div>}
              {c.pencatat && <div style={{ fontSize: 11.5, color: C.muted, marginTop: 7, display: "flex", alignItems: "center", gap: 4 }}><User size={12} /> {c.pencatat}</div>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <button className="btn iconbtn" onClick={() => onUbah(c)} title="Ubah" style={{ background: "#fff", padding: 7, borderRadius: 8 }}><Pencil size={13} /></button>
              <button className="btn iconbtn" onClick={() => onHapus(c.id)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 7, borderRadius: 8 }}><Trash2 size={13} /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CatatanHarianModal({ awal, namaPencatat, onClose, onSimpan }) {
  const sekarang = new Date();
  const hariIni = `${sekarang.getFullYear()}-${String(sekarang.getMonth() + 1).padStart(2, "0")}-${String(sekarang.getDate()).padStart(2, "0")}`;
  const jamIni = `${String(sekarang.getHours()).padStart(2, "0")}:${String(sekarang.getMinutes()).padStart(2, "0")}`;

  const [f, setF] = useState(awal || {
    tanggal: hariIni, waktu: jamIni, kondisi: "sehat", isi: "",
    pencatat: namaPencatat, waktuISO: sekarang.toISOString(),
  });
  const [ubahWaktu, setUbahWaktu] = useState(false);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const bisa = f.isi.trim().length > 0;

  // Waktu yang sedang dipilih, untuk ditampilkan dalam dua zona
  const isoPilihan = useMemo(() => {
    const d = new Date(`${f.tanggal}T${f.waktu || "00:00"}:00`);
    return isNaN(d) ? new Date().toISOString() : d.toISOString();
  }, [f.tanggal, f.waktu]);

  const simpan = () => onSimpan({ ...f, waktuISO: isoPilihan });

  return (
    <Modal onClose={onClose} width={440}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <NotebookPen size={18} color={C.green} /> {awal ? "Ubah Catatan" : "Catatan Harian"}
          </h3>
          <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>

        <Label>Kondisi jamaah</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
          {Object.entries(KONDISI).map(([k, v]) => {
            const on = f.kondisi === k;
            return (
              <button key={k} className="btn" onClick={() => set("kondisi", k)}
                style={{ justifyContent: "flex-start", padding: "10px 12px", borderRadius: 11, fontSize: 12.5,
                  background: on ? v.latar : "#fff", color: on ? v.warna : C.muted,
                  border: `1.5px solid ${on ? v.warna : C.border}` }}>
                <v.ikon size={15} /> {v.label}
              </button>
            );
          })}
        </div>

        <Label>Waktu pencatatan</Label>
        <div style={{ background: C.bg, borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 9, display: "flex", alignItems: "center", gap: 7 }}>
            <CalendarDays size={15} color={C.green} /> {tglPanjang(f.tanggal)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 11px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".05em", color: C.muted, textTransform: "uppercase", marginBottom: 3 }}>WIB · Jakarta</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: C.green, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{jamWIB(isoPilihan)}</div>
            </div>
            <div style={{ background: C.goldSoft, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: "9px 11px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".05em", color: C.goldDeep, textTransform: "uppercase", marginBottom: 3 }}>AST · Makkah</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: C.goldDeep, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{jamAST(isoPilihan)}</div>
            </div>
          </div>

          {!ubahWaktu ? (
            <button className="btn" onClick={() => setUbahWaktu(true)}
              style={{ background: "transparent", color: C.muted, padding: "8px 0 0", fontSize: 12, fontWeight: 600 }}>
              <Pencil size={12} /> Ubah tanggal / waktu
            </button>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
              <input className="field" type="date" style={inputStyle} value={f.tanggal} onChange={(e) => set("tanggal", e.target.value)} />
              <input className="field" type="time" style={inputStyle} value={f.waktu} onChange={(e) => set("waktu", e.target.value)} />
            </div>
          )}
        </div>

        <div style={{ marginTop: 14 }}>
          <Label>Catatan</Label>
          <textarea className="field" rows={4} style={{ ...inputStyle, resize: "vertical" }} value={f.isi} onChange={(e) => set("isi", e.target.value)}
            placeholder="cth. Mengeluh pusing setelah thawaf, sudah istirahat dan minum air zamzam." />
        </div>

        <div style={{ marginTop: 14 }}>
          <Label>Dicatat oleh</Label>
          <input className="field" style={inputStyle} value={f.pencatat} onChange={(e) => set("pencatat", e.target.value)} placeholder="Nama pembimbing" />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button className="btn" onClick={onClose} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "10px 18px", borderRadius: 11 }}>Batal</button>
          <button className="btn" disabled={!bisa} onClick={simpan}
            style={{ background: bisa ? C.green : C.border, color: "#fff", padding: "10px 20px", borderRadius: 11, cursor: bisa ? "pointer" : "not-allowed" }}>
            <Check size={16} /> Simpan
          </button>
        </div>
      </div>
    </Modal>
  );
}

function JamaahForm({ initial, list, onCancel, onSave }) {
  const [f, setF] = useState(initial || { foto: null, nama: "", jenisKelamin: "Laki-laki", telepon: "", alamat: "", rombongan: "", tempatLahir: "", tanggalLahir: "", riwayatPenyakit: "", kursiRoda: false, catatan: "", relasi: [] });
  const fileRef = useRef(null);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const setRel = (i, k, v) => setF((s) => { const r = [...(s.relasi || [])]; r[i] = { ...r[i], [k]: v }; return { ...s, relasi: r }; });
  const addRel = () => setF((s) => ({ ...s, relasi: [...(s.relasi || []), { id: "", hubungan: "Anak" }] }));
  const delRel = (i) => setF((s) => ({ ...s, relasi: (s.relasi || []).filter((_, x) => x !== i) }));
  const [fotoSibuk, setFotoSibuk] = useState(false);
  const [fotoMentah, setFotoMentah] = useState(null);
  const pickPhoto = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Pilih berkas gambar.");
    if (file.size > 12 * 1024 * 1024) return alert("Ukuran foto maksimal 12 MB.");
    setFotoSibuk(true);
    const rd = new FileReader();
    rd.onload = () => { setFotoMentah(rd.result); setFotoSibuk(false); };
    rd.onerror = () => { alert("Gagal membaca foto."); setFotoSibuk(false); };
    rd.readAsDataURL(file);
    e.target.value = "";
  };
  const y = hitungUsia(f.tanggalLahir);
  const canSave = f.nama.trim().length > 0;
  const others = list.filter((j) => j.id !== f.id);

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 820, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 4px", fontSize: 23, fontWeight: 600 }}>{initial ? "Ubah Data Jamaah" : "Tambah Jamaah Baru"}</h2>
        <p style={{ margin: "0 0 22px", fontSize: 13, color: C.muted }}>Lengkapi profil dan kebutuhan khusus jamaah.</p>

        {fotoMentah && (
          <EditorGambar sumber={fotoMentah} rasioAwal="potret" judul="Atur Foto Jamaah"
            onBatal={() => setFotoMentah(null)}
            onSelesai={(hasil) => { set("foto", hasil.data); setFotoMentah(null); }} />
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ position: "relative" }}>
            <Avatar foto={f.foto} nama={f.nama || "?"} size={84} />
            {f.foto && <button className="btn" onClick={() => set("foto", null)} title="Hapus foto" style={{ position: "absolute", top: -6, right: -6, background: C.danger, color: "#fff", width: 24, height: 24, borderRadius: 99, padding: 0, justifyContent: "center" }}><X size={14} /></button>}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" onChange={pickPhoto} style={{ display: "none" }} />
            <button className="btn" onClick={() => fileRef.current?.click()} disabled={fotoSibuk} style={{ background: C.greenSoft, color: C.green, padding: "9px 15px", borderRadius: 11 }}>{fotoSibuk ? <Loader2 size={16} className="spin" /> : <Camera size={16} />} {fotoSibuk ? "Mengunggah…" : f.foto ? "Ganti foto" : "Unggah foto"}</button>
            <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>Setelah dipilih, foto bisa digeser & diperbesar. Bentuk potret disarankan.</div>
          </div>
        </div>

        <Section title="Profil dasar" />
        <Grid>
          <div style={{ gridColumn: "1 / -1" }}><Label req>Nama lengkap</Label><input className="field" style={inputStyle} value={f.nama} onChange={(e) => set("nama", e.target.value)} placeholder="cth. Hj. Aminah Suryani" /></div>
          <div><Label>Jenis kelamin</Label><select className="field" style={inputStyle} value={f.jenisKelamin} onChange={(e) => set("jenisKelamin", e.target.value)}><option>Laki-laki</option><option>Perempuan</option></select></div>
          <div><Label>Rombongan</Label><input className="field" style={inputStyle} value={f.rombongan} onChange={(e) => set("rombongan", e.target.value)} placeholder="cth. A" /></div>
          <div><Label>Telepon / WhatsApp</Label><input className="field" style={inputStyle} value={f.telepon} onChange={(e) => set("telepon", e.target.value)} placeholder="08xx-xxxx-xxxx" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Alamat</Label><input className="field" style={inputStyle} value={f.alamat} onChange={(e) => set("alamat", e.target.value)} placeholder="Kota / domisili" /></div>
        </Grid>

        <Section title="Tempat & tanggal lahir" />
        <Grid>
          <div><Label>Tempat lahir</Label><input className="field" style={inputStyle} value={f.tempatLahir} onChange={(e) => set("tempatLahir", e.target.value)} placeholder="cth. Cianjur" /></div>
          <div><Label>Tanggal lahir</Label><input className="field" type="date" style={inputStyle} value={f.tanggalLahir} onChange={(e) => set("tanggalLahir", e.target.value)} max={new Date().toISOString().slice(0, 10)} /></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ background: y != null ? C.goldSoft : C.bg, border: `1px solid ${y != null ? C.gold + "55" : C.border}`, borderRadius: 12, padding: "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <Calendar size={17} color={C.goldDeep} />
              <span style={{ fontSize: 13.5 }}>{y != null ? <><strong>Usia otomatis: {y} tahun.</strong> {y >= 60 ? "Termasuk lansia — perhatikan mobilitas & kesehatan." : y < 17 ? "Jamaah usia muda." : "Usia dewasa."}</> : <span style={{ color: C.muted }}>Isi tanggal lahir untuk menghitung usia otomatis.</span>}</span>
            </div>
          </div>
        </Grid>

        <Section title="Keluarga & relasi jamaah" />
        <p style={{ margin: "-6px 0 12px", fontSize: 12.5, color: C.muted }}>Tautkan ke jamaah lain yang berkaitan (suami, istri, anak, pendamping, dll). Berguna agar keluarga tidak terpisah.</p>
        {(f.relasi || []).map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
            <select className="field" style={{ ...inputStyle, flex: 2 }} value={r.id} onChange={(e) => setRel(i, "id", e.target.value)}>
              <option value="">— pilih jamaah —</option>
              {others.map((j) => <option key={j.id} value={j.id}>{j.nama}</option>)}
            </select>
            <select className="field" style={{ ...inputStyle, flex: 1 }} value={r.hubungan} onChange={(e) => setRel(i, "hubungan", e.target.value)}>
              {HUB.map((h) => <option key={h}>{h}</option>)}
            </select>
            <button className="btn iconbtn" onClick={() => delRel(i)} style={{ background: C.dangerSoft, color: C.danger, padding: 10, borderRadius: 10 }}><X size={15} /></button>
          </div>
        ))}
        <button className="btn" onClick={addRel} style={{ background: C.greenSoft, color: C.green, padding: "8px 14px", borderRadius: 10, marginTop: 2 }}><UserPlus size={16} /> Tambah relasi</button>

        <Section title="Kebutuhan khusus & kesehatan" />
        <Grid>
          <div style={{ gridColumn: "1 / -1" }}><Label>Riwayat penyakit</Label><textarea className="field" rows={2} style={{ ...inputStyle, resize: "vertical" }} value={f.riwayatPenyakit} onChange={(e) => set("riwayatPenyakit", e.target.value)} placeholder="cth. Hipertensi, obat rutin pagi hari…" /></div>
          <div>
            <Label>Kursi roda</Label>
            <button className="btn" onClick={() => set("kursiRoda", !f.kursiRoda)} style={{ width: "100%", justifyContent: "space-between", padding: "10px 14px", borderRadius: 11, border: `1px solid ${f.kursiRoda ? C.green : C.border}`, background: f.kursiRoda ? C.greenSoft : "#fff", color: f.kursiRoda ? C.green : C.muted }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Accessibility size={17} /> {f.kursiRoda ? "Membutuhkan kursi roda" : "Tidak perlu"}</span>
              <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${f.kursiRoda ? C.green : C.border}`, background: f.kursiRoda ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>{f.kursiRoda && <Check size={13} color="#fff" />}</span>
            </button>
          </div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Catatan individu</Label><textarea className="field" rows={2} style={{ ...inputStyle, resize: "vertical" }} value={f.catatan} onChange={(e) => set("catatan", e.target.value)} placeholder="cth. Perlu bantuan naik-turun bus, kamar dekat lift…" /></div>
        </Grid>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave(f)} style={{ background: canSave ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BUS PAGE  — klik untuk isi, drag & drop untuk tukar
   ============================================================ */
const BUS_ROWS = 15;
const COLS = ["A", "B", "C", "D"];
const allSeatIds = () => { const a = []; for (let r = 1; r <= BUS_ROWS; r++) COLS.forEach((c) => a.push(`${r}${c}`)); return a; };

function BisHotelPage({ list, seats, setSeats, hotel, setHotel, byId, bolehKelola = true }) {
  const [tab, setTab] = useState("bis");
  const kamar = hotel?.kamar || [];

  return (
    <div className="fade">
      <div style={{ display: "flex", gap: 8, marginBottom: 18, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 5 }}>
        {[
          { id: "bis", label: "Kursi Bis", icon: Bus, jml: Object.values(seats || {}).filter(Boolean).length },
          { id: "hotel", label: "Kamar Hotel", icon: Hotel, jml: kamar.reduce((n, k) => n + (k.penghuni || []).length, 0) },
        ].map((t) => {
          const on = tab === t.id;
          return (
            <button key={t.id} className="btn" onClick={() => setTab(t.id)}
              style={{ flex: 1, justifyContent: "center", gap: 8, padding: "11px 10px", borderRadius: 10, fontSize: 13.5,
                background: on ? C.green : "transparent", color: on ? "#fff" : C.muted, fontWeight: on ? 800 : 600 }}>
              <t.icon size={17} /> {t.label}
              <span style={{ background: on ? "#ffffff2e" : C.bg, color: on ? "#fff" : C.muted, padding: "1px 8px", borderRadius: 99, fontSize: 11.5, fontWeight: 700 }}>{t.jml}</span>
            </button>
          );
        })}
      </div>

      {tab === "bis"
        ? <BusPage list={list} seats={seats} setSeats={setSeats} byId={byId} bolehKelola={bolehKelola} />
        : <HotelPage list={list} kamar={kamar} setKamar={(k) => setHotel({ ...(hotel || {}), kamar: k })} byId={byId} bolehKelola={bolehKelola} />}
    </div>
  );
}

function BusPage({ list, seats, setSeats, byId, bolehKelola = true }) {
  const [drag, setDrag] = useState(null);
  const [over, setOver] = useState(null);
  const [picker, setPicker] = useState(null); // seatId being assigned

  const seatIds = allSeatIds();
  // ID bisa berupa angka (data pembimbing) atau teks (direktori jamaah),
  // jadi semua perbandingan disamakan sebagai teks.
  const seated = new Set(Object.values(seats).filter(Boolean).map(String));
  const pool = list.filter((j) => !seated.has(String(j.id)));

  const assign = (seatId, jamaahId) => setSeats((s) => { const n = { ...s }; for (const k of Object.keys(n)) if (String(n[k]) === String(jamaahId)) delete n[k]; n[seatId] = Number(jamaahId) || jamaahId; return n; });
  const clearSeat = (seatId) => setSeats((s) => { const n = { ...s }; delete n[seatId]; return n; });
  const swap = (a, b) => setSeats((s) => { const n = { ...s }; const va = n[a], vb = n[b]; if (vb == null) delete n[a]; else n[a] = vb; if (va == null) delete n[b]; else n[b] = va; return n; });

  const onDrop = (target) => {
    if (!drag) return;
    if (drag.type === "pool") assign(target, drag.jamaahId);
    else if (drag.type === "seat" && drag.seatId !== target) swap(drag.seatId, target);
    setDrag(null); setOver(null);
  };

  const Seat = ({ id }) => {
    const jid = seats[id]; const j = jid ? byId(jid) : null;
    const isOver = over === id;
    return (
      <div className={`seat${isOver ? " dragover" : ""}`}
        draggable={!!j}
        onDragStart={() => j && setDrag({ type: "seat", seatId: id })}
        onDragEnd={() => { setDrag(null); setOver(null); }}
        onDragOver={(e) => { e.preventDefault(); setOver(id); }}
        onDragLeave={() => setOver((o) => (o === id ? null : o))}
        onDrop={(e) => { e.preventDefault(); onDrop(id); }}
        onClick={() => setPicker(id)}
        title={j ? j.nama : `Kursi ${id} (kosong)`}
        style={{
          width: 58, height: 54, borderRadius: 11, cursor: "pointer", flexShrink: 0,
          background: j ? C.green : "#fff", color: j ? "#fff" : C.muted,
          border: `1.5px solid ${j ? C.greenDeep : C.border}`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: 4, position: "relative", overflow: "hidden",
        }}>
        <span style={{ position: "absolute", top: 3, left: 6, fontSize: 9, fontWeight: 700, opacity: .7 }}>{id}</span>
        {j ? (
          <>
            <span style={{ fontWeight: 800, fontSize: 13, lineHeight: 1 }}>{inisial(j.nama)}</span>
            <span style={{ fontSize: 8.5, marginTop: 3, maxWidth: 56, textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.nama.split(" ")[j.nama.split(" ").length - 1]}</span>
            {j.kursiRoda && <Accessibility size={11} style={{ position: "absolute", bottom: 3, right: 4, opacity: .85 }} />}
          </>
        ) : <Armchair size={20} color={C.border} />}
      </div>
    );
  };

  return (
    <div className="fade">
      <div style={{ marginBottom: 16 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Denah Kursi Bis</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Klik kursi untuk menempatkan jamaah. Seret (drag) kursi untuk menukar posisi. {Object.keys(seats).length}/{seatIds.length} kursi terisi.</p>
      </div>

      <div className="bus-layout">
        {/* BUS */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 22, padding: "20px 18px", overflowX: "auto" }} className="kbih-scroll">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px 14px", borderBottom: `1px dashed ${C.border}`, marginBottom: 14, minWidth: 320 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: C.muted }}><Bus size={16} /> Depan bis</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: C.muted }}>Sopir <span style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${C.border}`, display: "inline-block" }} /></span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 320 }}>
            {Array.from({ length: BUS_ROWS }, (_, r) => r + 1).map((r) => (
              <div key={r} style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
                <Seat id={`${r}A`} /><Seat id={`${r}B`} />
                <div style={{ width: 22, textAlign: "center", fontSize: 10, color: C.border, fontWeight: 700, flexShrink: 0 }}>{r}</div>
                <Seat id={`${r}C`} /><Seat id={`${r}D`} />
              </div>
            ))}
          </div>
        </div>

        {/* POOL */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 16 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em", color: C.ink, marginBottom: 4 }}>Belum dapat kursi</div>
          <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 12 }}>Seret nama ke kursi, atau klik kursi lalu pilih.</div>
          {pool.length === 0 ? (
            <div style={{ fontSize: 12.5, color: C.green, background: C.greenSoft, padding: "10px 12px", borderRadius: 10, display: "flex", gap: 6, alignItems: "center" }}><CheckCircle2 size={15} /> Semua jamaah sudah dapat kursi.</div>
          ) : pool.map((j) => (
            <div key={j.id} draggable onDragStart={() => setDrag({ type: "pool", jamaahId: j.id })} onDragEnd={() => setDrag(null)}
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 8, cursor: "grab", background: "#fff" }}>
              <GripVertical size={15} color={C.border} />
              <Avatar foto={j.foto} nama={j.nama} size={32} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 130 }}>{j.nama}</div>
                <div style={{ fontSize: 11, color: C.muted }}>Rmb {j.rombongan || "-"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PICKER */}
      {picker && (
        <Modal onClose={() => setPicker(null)} width={420}>
          <SeatPicker seatId={picker} current={seats[picker] ? byId(seats[picker]) : null} pool={pool} onAssign={(jid) => { assign(picker, jid); setPicker(null); }} onClear={() => { clearSeat(picker); setPicker(null); }} onClose={() => setPicker(null)} />
        </Modal>
      )}
    </div>
  );
}

function SeatPicker({ seatId, current, pool, onAssign, onClear, onClose }) {
  const [q, setQ] = useState("");
  const opts = pool.filter((j) => j.nama.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Kursi {seatId}</h3>
        <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
      </div>
      {current ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.greenSoft, padding: "10px 12px", borderRadius: 12, margin: "10px 0 14px" }}>
          <Avatar foto={current.foto} nama={current.nama} size={36} />
          <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{current.nama}</div><div style={{ fontSize: 11.5, color: C.muted }}>menempati kursi ini</div></div>
          <button className="btn" onClick={onClear} style={{ background: C.dangerSoft, color: C.danger, padding: "7px 12px", borderRadius: 10, fontSize: 12.5 }}><X size={14} /> Kosongkan</button>
        </div>
      ) : <p style={{ margin: "8px 0 12px", fontSize: 13, color: C.muted }}>Pilih jamaah untuk kursi ini:</p>}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <Search size={15} color={C.muted} style={{ position: "absolute", left: 11, top: 11 }} />
        <input className="field" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama…" style={{ ...inputStyle, paddingLeft: 34 }} />
      </div>
      <div style={{ maxHeight: 260, overflow: "auto" }} className="kbih-scroll">
        {opts.length === 0 ? <div style={{ fontSize: 13, color: C.muted, padding: 10, textAlign: "center" }}>Tidak ada jamaah tersedia.</div> : opts.map((j) => (
          <button key={j.id} className="btn" onClick={() => onAssign(j.id)} style={{ width: "100%", justifyContent: "flex-start", gap: 10, padding: "9px 10px", borderRadius: 11, background: "#fff", border: `1px solid ${C.border}`, marginBottom: 7 }}>
            <Avatar foto={j.foto} nama={j.nama} size={32} />
            <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 700 }}>{j.nama}</div><div style={{ fontSize: 11, color: C.muted }}>Rmb {j.rombongan || "-"} · {labelUsia(hitungUsia(j.tanggalLahir))?.text || "—"}</div></div>
            <ChevronRight size={16} color={C.border} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   AGENDA PAGE
   ============================================================ */
function AgendaPage({ agenda, setAgenda, list, absen, setAbsen, bolehKelola = true }) {
  const [mode, setMode] = useState("list"); // list | form | absen
  const [editing, setEditing] = useState(null);
  const [absenId, setAbsenId] = useState(null);

  const sorted = [...agenda].sort((a, b) => (a.tanggal + a.waktu).localeCompare(b.tanggal + b.waktu));
  const remove = (id) => { if (window.confirm("Hapus agenda ini?")) setAgenda((a) => a.filter((x) => x.id !== id)); };
  const save = (d) => { if (d.id) setAgenda((a) => a.map((x) => (x.id === d.id ? d : x))); else setAgenda((a) => [...a, { ...d, id: Date.now() }]); setMode("list"); };
  const tandaiSelesai = (id) => setAgenda((a) => a.map((x) => (x.id === id
    ? { ...x, selesai: !x.selesai, selesaiPada: !x.selesai ? new Date().toISOString() : null }
    : x)));
  const jmlSelesai = agenda.filter((a) => a.selesai).length;

  if (mode === "absen") { const ag = agenda.find((a) => a.id === absenId); if (ag) return <AbsenEditor ag={ag} list={list} absen={absen} setAbsen={setAbsen} onBack={() => setMode("list")} />; }
  if (mode === "form") return <AgendaForm initial={editing} onCancel={() => setMode("list")} onSave={save} />;

  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div><h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Agenda Perjalanan</h2><p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>
          Jadwal kegiatan selama bimbingan & di tanah suci.{agenda.length > 0 && <> <strong style={{ color: C.green }}>{jmlSelesai} dari {agenda.length} selesai.</strong></>}
        </p></div>
        {bolehKelola && <button className="btn" onClick={() => { setEditing(null); setMode("form"); }} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}><Plus size={18} /> Tambah Agenda</button>}
      </div>

      {sorted.length === 0 ? <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}><CalendarDays size={32} color={C.border} /><p style={{ marginTop: 12, fontWeight: 600 }}>Belum ada agenda.</p></div> : (
        <div style={{ position: "relative", paddingLeft: 8 }}>
          {sorted.map((a, idx) => {
            const rec = absen[a.id] || {}; const hadir = Object.values(rec).filter((v) => v === "hadir").length;
            return (
              <div key={a.id} style={{ display: "flex", gap: 16, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: 99, marginTop: 22,
                    background: a.selesai ? C.border : C.green,
                    border: `3px solid ${a.selesai ? C.bg : C.greenSoft}`,
                    transition: "background .2s",
                  }} />
                  {idx < sorted.length - 1 && <div style={{ width: 2, flex: 1, background: C.border, margin: "4px 0" }} />}
                </div>
                <div className="card-hover" style={{
                  flex: 1, background: C.surface, borderRadius: 16, padding: 16, marginBottom: 14,
                  border: `1px solid ${a.selesai ? C.border : C.border}`,
                  opacity: a.selesai ? .55 : 1,
                  filter: a.selesai ? "saturate(.45)" : "none",
                  transition: "opacity .25s ease, filter .25s ease",
                }}>
                  {a.gambar && <img src={a.gambar.data} alt={a.judul} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 12, marginBottom: 12, display: "block" }} />}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ minWidth: 0, display: "flex", gap: 11 }}>
                      {/* kotak ceklis selesai */}
                      <button className="btn" onClick={() => bolehKelola && tandaiSelesai(a.id)}
                        disabled={!bolehKelola} title={a.selesai ? "Tandai belum selesai" : "Tandai selesai"}
                        style={{
                          width: 26, height: 26, flexShrink: 0, marginTop: 2, padding: 0,
                          borderRadius: 8, justifyContent: "center",
                          background: a.selesai ? C.green : "#fff",
                          border: `2px solid ${a.selesai ? C.green : C.border}`,
                          color: "#fff", cursor: bolehKelola ? "pointer" : "default",
                        }}>
                        {a.selesai && <Check size={15} strokeWidth={3.2} />}
                      </button>
                      <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 5 }}>
                        <Badge bg={C.greenSoft} color={C.green} icon={CalendarDays}>{tglRingkas(a.tanggal)}</Badge>
                        <Badge bg={C.goldSoft} color={C.goldDeep} icon={Clock}>{a.waktu} WIB/AST</Badge>
                        {a.selesai && <Badge bg={C.greenSoft} color={C.green} icon={CheckCircle2}>Selesai</Badge>}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700, textDecoration: a.selesai ? "line-through" : "none", textDecorationColor: C.border }}>{a.judul}</div>
                      <div style={{ fontSize: 13, color: C.muted, marginTop: 3, display: "flex", alignItems: "center", gap: 5 }}><MapPin size={13} /> {a.lokasi || "—"}</div>
                      {a.keterangan && <div style={{ fontSize: 13, color: C.ink, marginTop: 7, lineHeight: 1.5 }}>{a.keterangan}</div>}
                      {a.materi && (
                        <button className="btn" onClick={() => bukaBerkas(a.materi)} style={{ marginTop: 10, background: C.dangerSoft, color: C.danger, padding: "8px 13px", borderRadius: 10, fontSize: 12.5 }}>
                          <Paperclip size={14} /> Materi: {a.materi.nama}{a.materi.ukuran ? <span style={{ fontWeight: 500, opacity: .8 }}> ({formatUkuran(a.materi.ukuran)})</span> : null}
                        </button>
                      )}
                      </div>
                    </div>
                    {bolehKelola && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-end" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn iconbtn" onClick={() => { setEditing(a); setMode("form"); }} style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Pencil size={15} /></button>
                          <button className="btn iconbtn" onClick={() => remove(a.id)} style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><Trash2 size={15} /></button>
                        </div>
                        <button className="btn" onClick={() => { setAbsenId(a.id); setMode("absen"); }} style={{ background: C.green, color: "#fff", padding: "8px 14px", borderRadius: 10, fontSize: 13 }}><ClipboardCheck size={15} /> Absensi ({hadir}/{list.length})</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AgendaForm({ initial, onCancel, onSave }) {
  const [f, setF] = useState(initial || { tanggal: "", waktu: "", judul: "", lokasi: "", keterangan: "", gambar: null, materi: null });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const canSave = f.judul.trim() && f.tanggal;

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 640, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>{initial ? "Ubah Agenda" : "Tambah Agenda"}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><Label>Tanggal</Label><input className="field" type="date" style={inputStyle} value={f.tanggal} onChange={(e) => set("tanggal", e.target.value)} /></div>
          <div><Label>Waktu</Label><input className="field" type="time" style={inputStyle} value={f.waktu} onChange={(e) => set("waktu", e.target.value)} /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Nama kegiatan</Label><input className="field" style={inputStyle} value={f.judul} onChange={(e) => set("judul", e.target.value)} placeholder="cth. Ziarah Kota Madinah" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Lokasi</Label><input className="field" style={inputStyle} value={f.lokasi} onChange={(e) => set("lokasi", e.target.value)} placeholder="cth. Masjid Nabawi" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Keterangan</Label><textarea className="field" rows={3} style={{ ...inputStyle, resize: "vertical" }} value={f.keterangan} onChange={(e) => set("keterangan", e.target.value)} placeholder="Detail kegiatan, titik kumpul, dll…" /></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Gambar kegiatan (opsional)</Label>
            <UploadGambar nilai={f.gambar} onChange={(v) => set("gambar", v)} label="Unggah gambar kegiatan" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Materi pembimbing (tautan PDF, opsional)</Label>
            <TautanBerkas nilai={f.materi} onChange={(v) => set("materi", v)} label="Tambah tautan materi (PDF)" />
            <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>Materi terbuka langsung dari kartu agenda saat di lapangan.</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave(f)} style={{ background: canSave ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

function AbsenEditor({ ag, list, absen, setAbsen, onBack }) {
  const rec = absen[ag.id] || {};
  const setStatus = (jid, st) => setAbsen((a) => ({ ...a, [ag.id]: { ...(a[ag.id] || {}), [jid]: st } }));
  const setAll = (st) => setAbsen((a) => ({ ...a, [ag.id]: Object.fromEntries(list.map((j) => [j.id, st])) }));
  const count = (st) => list.filter((j) => rec[j.id] === st).length;

  return (
    <div className="fade">
      <button className="btn" onClick={onBack} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Kembali ke agenda</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
        <div style={{ background: `linear-gradient(120deg, ${C.greenDeep}, ${C.green})`, padding: "18px 22px", color: "#fff" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Badge bg="#ffffff26" color="#fff" icon={CalendarDays}>{tglRingkas(ag.tanggal)}</Badge>
            <Badge bg="#ffffff26" color="#fff" icon={Clock}>{ag.waktu}</Badge>
          </div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 700 }}>{ag.judul}</div>
          <div style={{ fontSize: 13, color: "#cfe0d6", marginTop: 2 }}>Absensi kehadiran jamaah</div>
        </div>
        <div style={{ padding: "14px 20px", display: "flex", gap: 10, flexWrap: "wrap", borderBottom: `1px solid ${C.border}`, alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: C.muted, marginRight: 4 }}>Tandai semua:</span>
          {Object.entries(STAT).map(([k, v]) => <button key={k} className="btn" onClick={() => setAll(k)} style={{ background: v.bg, color: v.color, padding: "6px 12px", borderRadius: 9, fontSize: 12.5 }}><v.icon size={14} /> {v.label}</button>)}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, fontSize: 12.5 }}>
            <span style={{ color: C.green, fontWeight: 700 }}>Hadir {count("hadir")}</span>
            <span style={{ color: C.goldDeep, fontWeight: 700 }}>Izin {count("izin")}</span>
            <span style={{ color: C.danger, fontWeight: 700 }}>Tidak {count("tidak")}</span>
          </div>
        </div>
        <div style={{ padding: "8px 20px 20px" }}>
          {list.map((j) => (
            <div key={j.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: `1px solid ${C.border}` }}>
              <Avatar foto={j.foto} nama={j.nama} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{j.nama}</div>
                <div style={{ fontSize: 11.5, color: C.muted }}>Rmb {j.rombongan || "-"}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {Object.entries(STAT).map(([k, v]) => {
                  const on = rec[j.id] === k;
                  return <button key={k} className="btn" onClick={() => setStatus(j.id, k)} title={v.label}
                    style={{ background: on ? v.color : v.bg, color: on ? "#fff" : v.color, padding: "7px 10px", borderRadius: 9, fontSize: 12.5, fontWeight: 700, border: on ? "none" : `1px solid ${v.color}22` }}>
                    <v.icon size={15} /> <span style={{ display: "inline" }}>{v.label}</span>
                  </button>;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ABSENSI PAGE (rekap)
   ============================================================ */
function AbsensiPage({ agenda, list, absen, setAbsen }) {
  const [mode, setMode] = useState("rekap"); // rekap | per
  const [absenId, setAbsenId] = useState(null);
  const sorted = [...agenda].sort((a, b) => (a.tanggal + a.waktu).localeCompare(b.tanggal + b.waktu));

  if (mode === "per") { const ag = agenda.find((a) => a.id === absenId); if (ag) return <AbsenEditor ag={ag} list={list} absen={absen} setAbsen={setAbsen} onBack={() => setMode("rekap")} />; }

  const rateOf = (jid) => { let h = 0; sorted.forEach((a) => { if ((absen[a.id] || {})[jid] === "hadir") h++; }); return sorted.length ? Math.round((h / sorted.length) * 100) : 0; };

  return (
    <div className="fade">
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Rekap Absensi</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Ringkasan kehadiran seluruh jamaah di tiap agenda. Klik nama agenda untuk mengisi absensi.</p>
      </div>

      {sorted.length === 0 || list.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}><ClipboardCheck size={32} color={C.border} /><p style={{ marginTop: 12, fontWeight: 600 }}>Butuh minimal 1 agenda & 1 jamaah untuk rekap.</p></div>
      ) : (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, overflow: "auto" }} className="kbih-scroll">
          <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 620 }}>
            <thead>
              <tr>
                <th style={{ position: "sticky", left: 0, background: C.surface, textAlign: "left", padding: "14px 16px", fontSize: 12, color: C.muted, borderBottom: `2px solid ${C.border}`, zIndex: 2 }}>Jamaah</th>
                {sorted.map((a) => (
                  <th key={a.id} onClick={() => { setAbsenId(a.id); setMode("per"); }} title="Isi absensi" style={{ padding: "12px 8px", borderBottom: `2px solid ${C.border}`, cursor: "pointer", minWidth: 92 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: C.green }}>{a.judul}</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{tglRingkas(a.tanggal)}</div>
                  </th>
                ))}
                <th style={{ padding: "12px 14px", borderBottom: `2px solid ${C.border}`, fontSize: 12, color: C.muted }}>% Hadir</th>
              </tr>
            </thead>
            <tbody>
              {list.map((j) => (
                <tr key={j.id}>
                  <td style={{ position: "sticky", left: 0, background: C.surface, padding: "10px 16px", borderBottom: `1px solid ${C.border}`, zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <Avatar foto={j.foto} nama={j.nama} size={30} />
                      <div><div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>{j.nama}</div><div style={{ fontSize: 10.5, color: C.muted }}>Rmb {j.rombongan || "-"}</div></div>
                    </div>
                  </td>
                  {sorted.map((a) => {
                    const st = (absen[a.id] || {})[j.id]; const v = st ? STAT[st] : null;
                    return <td key={a.id} style={{ textAlign: "center", borderBottom: `1px solid ${C.border}` }}>
                      {v ? <span style={{ display: "inline-flex", width: 26, height: 26, borderRadius: 8, background: v.bg, color: v.color, alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>{v.huruf}</span> : <span style={{ color: C.border }}>·</span>}
                    </td>;
                  })}
                  <td style={{ textAlign: "center", borderBottom: `1px solid ${C.border}`, fontWeight: 800, color: rateOf(j.id) >= 75 ? C.green : rateOf(j.id) >= 50 ? C.goldDeep : C.danger }}>{rateOf(j.id)}%</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ position: "sticky", left: 0, background: C.bg, padding: "10px 16px", fontSize: 12, fontWeight: 700, color: C.muted }}>Hadir / total</td>
                {sorted.map((a) => { const h = list.filter((j) => (absen[a.id] || {})[j.id] === "hadir").length; return <td key={a.id} style={{ textAlign: "center", background: C.bg, fontSize: 12, fontWeight: 700, color: C.green }}>{h}/{list.length}</td>; })}
                <td style={{ background: C.bg }} />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      <div style={{ display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap" }}>
        {Object.entries(STAT).map(([k, v]) => <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: C.muted }}><span style={{ width: 18, height: 18, borderRadius: 5, background: v.bg, color: v.color, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 10 }}>{v.huruf}</span> {v.label}</span>)}
      </div>
    </div>
  );
}

/* ============================================================
   LOKASI PAGE — jarak & arah dari HP pembimbing
   ============================================================ */
/* ---------- kompas: arah hadap HP ----------
   Memakai perhitungan terkoreksi kemiringan (tilt-compensated)
   supaya arah tetap tepat walau HP dimiringkan, ditambah
   peredam getaran agar panah tidak bergoyang-goyang.
-------------------------------------------- */
const DEG = Math.PI / 180;

// Menghitung arah kompas sebenarnya dari kemiringan perangkat
function hitungArahKompas(alpha, beta, gamma) {
  if (alpha == null) return null;
  const x = (beta || 0) * DEG, y = (gamma || 0) * DEG, z = alpha * DEG;
  const cX = Math.cos(x), cY = Math.cos(y), cZ = Math.cos(z);
  const sX = Math.sin(x), sY = Math.sin(y), sZ = Math.sin(z);
  const Vx = -cZ * sY - sZ * sX * cY;
  const Vy = -sZ * sY + cZ * sX * cY;
  let arah = Math.atan2(Vx, Vy) * (180 / Math.PI);
  return ((arah % 360) + 360) % 360;
}

const sudutLayar = () => {
  const o = window.screen?.orientation?.angle;
  if (typeof o === "number") return o;
  if (typeof window.orientation === "number") return window.orientation;
  return 0;
};

// Rata-rata melingkar supaya peralihan 359° → 0° tidak melompat
function haluskanArah(lama, baru, bobot = 0.25) {
  if (lama == null) return baru;
  let selisih = ((baru - lama + 540) % 360) - 180;
  return ((lama + selisih * bobot) % 360 + 360) % 360;
}

function useArahHP() {
  const [arah, setArah] = useState(null);
  const [status, setStatus] = useState("mati"); // mati | aktif | menunggu | ditolak | tidakAda
  const [andal, setAndal] = useState(true);
  const halusRef = useRef(null);
  const jenisRef = useRef(null);
  const bingkaiRef = useRef(null);

  const tangani = (e) => {
    let h = null;

    if (typeof e.webkitCompassHeading === "number" && !isNaN(e.webkitCompassHeading)) {
      // iOS: sudah berupa arah kompas sejati
      h = e.webkitCompassHeading;
      setAndal(e.webkitCompassAccuracy == null || e.webkitCompassAccuracy >= 0);
    } else if (e.alpha != null) {
      h = hitungArahKompas(e.alpha, e.beta, e.gamma);
      // Sesuaikan bila layar diputar (mode lanskap)
      if (h != null) h = (h + sudutLayar() + 360) % 360;
      setAndal(e.absolute === true || jenisRef.current === "deviceorientationabsolute");
    }

    if (h == null || isNaN(h)) return;
    halusRef.current = haluskanArah(halusRef.current, ((h % 360) + 360) % 360);

    // Perbarui tampilan maksimal sekali per bingkai layar
    if (bingkaiRef.current) return;
    bingkaiRef.current = requestAnimationFrame(() => {
      bingkaiRef.current = null;
      setArah(halusRef.current);
      setStatus((st) => (st === "menunggu" ? "aktif" : st));
    });
  };

  const nyalakan = async () => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setStatus("tidakAda"); return;
    }
    try {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        const hasil = await DeviceOrientationEvent.requestPermission();
        if (hasil !== "granted") { setStatus("ditolak"); return; }
      }
    } catch { setStatus("ditolak"); return; }

    // Utamakan sensor yang mengacu ke utara sejati
    const jenis = "ondeviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation";
    jenisRef.current = jenis;
    window.addEventListener(jenis, tangani, true);
    setStatus("menunggu");

    // Kalau versi absolut tidak mengirim data, pakai versi biasa
    if (jenis === "deviceorientationabsolute") {
      setTimeout(() => {
        if (halusRef.current == null) {
          window.addEventListener("deviceorientation", tangani, true);
          jenisRef.current = "keduanya";
        }
      }, 1200);
    }
  };

  const matikan = () => {
    window.removeEventListener("deviceorientationabsolute", tangani, true);
    window.removeEventListener("deviceorientation", tangani, true);
    if (bingkaiRef.current) cancelAnimationFrame(bingkaiRef.current);
    bingkaiRef.current = null;
    halusRef.current = null;
    jenisRef.current = null;
    setArah(null);
    setStatus("mati");
  };

  useEffect(() => () => {
    window.removeEventListener("deviceorientationabsolute", tangani, true);
    window.removeEventListener("deviceorientation", tangani, true);
    if (bingkaiRef.current) cancelAnimationFrame(bingkaiRef.current);
  }, []);

  return { arah, status, andal, nyalakan, matikan };
}

/* ---------- lokasi yang tetap hidup antar halaman ----------
   GPS mengirim banyak pembacaan dengan mutu berbeda-beda.
   Yang pertama datang biasanya dari jaringan/WiFi dengan
   ketelitian ratusan meter. Kode ini menyaring, hanya menerima
   pembacaan yang lebih baik, sehingga hasilnya bisa mendekati
   5-10 meter saat sinyal satelit sudah terkunci.
------------------------------------------------------------ */
const MUTU_LOKASI = (m) => {
  if (m == null) return { label: "—", warna: C.muted, latar: C.bg };
  if (m <= 10) return { label: "Sangat teliti", warna: "#0f5c37", latar: "#e7f0ea" };
  if (m <= 25) return { label: "Teliti", warna: "#2f7fa8", latar: "#e6f0f5" };
  if (m <= 60) return { label: "Cukup", warna: "#9a7620", latar: "#f4ead0" };
  return { label: "Masih kasar", warna: "#b23b3b", latar: "#f7e7e6" };
};

function useLokasiGlobal() {
  const [pos, setPos] = useState(null);
  const [aktif, setAktif] = useState(false);
  const [galat, setGalat] = useState("");
  const [mencari, setMencari] = useState(false);
  const idRef = useRef(null);
  const terbaikRef = useRef(null);
  const kompas = useArahHP();

  // Menerima pembacaan baru hanya bila lebih teliti,
  // atau bila pembacaan terbaik sudah kedaluwarsa.
  const terima = (p) => {
    const baru = {
      lat: p.coords.latitude, lng: p.coords.longitude,
      akurasi: p.coords.accuracy, waktu: p.timestamp,
      kecepatan: p.coords.speed, arahGerak: p.coords.heading,
    };
    const lama = terbaikRef.current;
    const usangMs = 12000;
    const layakPakai =
      !lama ||
      baru.akurasi <= lama.akurasi ||
      baru.waktu - lama.waktu > usangMs ||
      Math.abs(baru.lat - lama.lat) > 0.0004 || Math.abs(baru.lng - lama.lng) > 0.0004;

    if (!layakPakai) return;
    terbaikRef.current = baru;
    setPos(baru);
    setGalat("");
    if (baru.akurasi <= 15) setMencari(false);
  };

  const nyalakan = () => {
    if (!navigator.geolocation) { setGalat("Perangkat/browser ini tidak mendukung deteksi lokasi."); return; }
    if (idRef.current != null) return;
    setGalat(""); setAktif(true); setMencari(true);
    terbaikRef.current = null;
    kompas.nyalakan();

    // Pembacaan awal cepat, lalu pemantauan teliti
    navigator.geolocation.getCurrentPosition(terima, () => {}, { enableHighAccuracy: true, maximumAge: 0, timeout: 8000 });

    idRef.current = navigator.geolocation.watchPosition(
      terima,
      (err) => {
        if (err.code === 3) return;   // waktu habis: biarkan mencoba lagi
        setAktif(false); setMencari(false); idRef.current = null;
        setGalat(err.code === 1
          ? "Izin lokasi ditolak. Aktifkan izin lokasi untuk situs ini di pengaturan browser HP."
          : "Gagal membaca lokasi. Pastikan GPS aktif dan coba lagi.");
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 30000 }
    );

    // Berhenti menandai "mencari" setelah 25 detik walau belum sangat teliti
    setTimeout(() => setMencari(false), 25000);
  };

  const matikan = () => {
    if (idRef.current != null) navigator.geolocation.clearWatch(idRef.current);
    idRef.current = null;
    terbaikRef.current = null;
    setAktif(false); setMencari(false);
    kompas.matikan();
  };

  // Membuang pembacaan lama dan mencari ulang dari awal
  const segarkan = () => {
    terbaikRef.current = null;
    setMencari(true);
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(terima, () => setMencari(false), { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 });
    setTimeout(() => setMencari(false), 20000);
  };

  const ambilSekali = () => new Promise((selesai, gagal) => {
    if (pos && pos.akurasi <= 40 && Date.now() - pos.waktu < 20000) return selesai(pos);
    if (!navigator.geolocation) return gagal(new Error("Perangkat tidak mendukung deteksi lokasi."));
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const n = { lat: p.coords.latitude, lng: p.coords.longitude, akurasi: p.coords.accuracy, waktu: p.timestamp };
        terbaikRef.current = n; setPos(n); selesai(n);
      },
      (e) => (pos ? selesai(pos) : gagal(new Error(e.code === 1 ? "Izin lokasi ditolak." : "Gagal membaca lokasi."))),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 }
    );
  });

  useEffect(() => () => { if (idRef.current != null) navigator.geolocation.clearWatch(idRef.current); }, []);

  return { pos, aktif, galat, mencari, nyalakan, matikan, segarkan, ambilSekali, kompas };
}

function LokasiPage({ titikPenting, setTitikPenting, titikKumpul, setTitikKumpul, lokasi, bolehKelola = true }) {
  const [modal, setModal] = useState(null); // 'penting' | 'kumpul'
  const { pos, aktif: tracking, galat: errMsg, mencari, nyalakan: mulaiLokasi, matikan: berhentiLokasi, segarkan, kompas } = lokasi;

  return (
    <div className="fade">
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Lokasi, Jarak & Arah</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Jarak dan arah dihitung dari posisi HP Anda saat ini menuju tiap titik.</p>
      </div>

      {/* status lokasi saya */}
      <div style={{ background: tracking ? C.greenSoft : C.surface, border: `1px solid ${tracking ? C.green + "44" : C.border}`, borderRadius: 16, padding: 16, marginBottom: 20, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: tracking ? C.green : C.bg, color: tracking ? "#fff" : C.muted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Compass size={21} />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>{tracking ? "Lokasi Anda aktif" : "Lokasi Anda belum aktif"}</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>
            {pos ? <>Koordinat: {pos.lat.toFixed(6)}, {pos.lng.toFixed(6)}</> : "Aktifkan untuk melihat jarak & arah ke setiap titik."}
          </div>
          {pos && (() => {
            const m = MUTU_LOKASI(pos.akurasi);
            return (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 7, flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: m.latar, color: m.warna, padding: "4px 10px", borderRadius: 99, fontSize: 11.5, fontWeight: 800 }}>
                  <Crosshair size={12} /> ±{Math.round(pos.akurasi)} m · {m.label}
                </span>
                {mencari && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, color: C.muted }}>
                    <Loader2 size={12} className="spin" /> mencari sinyal satelit…
                  </span>
                )}
                <button className="btn" onClick={segarkan}
                  style={{ background: "transparent", color: C.green, padding: "2px 0", fontSize: 11.5, fontWeight: 700, textDecoration: "underline" }}>
                  Cari ulang
                </button>
              </div>
            );
          })()}
          {pos && pos.akurasi > 40 && (
            <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6, lineHeight: 1.55, background: C.bg, borderRadius: 9, padding: "8px 11px" }}>
              Ketelitian masih rendah. Agar mendekati 5-10 meter: berdirilah di tempat terbuka (jauh dari dinding tinggi),
              pastikan mode lokasi HP disetel <strong>Akurasi tinggi</strong>, dan tunggu 20-30 detik sampai satelit terkunci.
            </div>
          )}
          {errMsg && <div style={{ fontSize: 12.5, color: C.danger, marginTop: 4, display: "flex", alignItems: "center", gap: 5 }}><AlertTriangle size={13} /> {errMsg}</div>}
          {tracking && (
            <div style={{ fontSize: 12, marginTop: 5, display: "flex", alignItems: "center", gap: 6, color: kompas.status === "aktif" ? C.green : C.muted, flexWrap: "wrap" }}>
              <Compass size={13} />
              {kompas.status === "aktif" && kompas.arah != null
                ? <>Kompas aktif — HP menghadap {arahMataAngin(kompas.arah)} ({Math.round(kompas.arah)}°).{!kompas.andal && " Akurasi rendah — gerakkan HP membentuk angka 8 untuk kalibrasi."}</>
                : kompas.status === "menunggu"
                ? <>Membaca sensor arah… gerakkan HP membentuk angka 8 untuk kalibrasi.</>
                : kompas.status === "ditolak"
                ? <>Izin sensor arah ditolak — panah memakai arah dari Utara.</>
                : <>Sensor arah tidak tersedia — panah memakai arah dari Utara.
                    <button className="btn" onClick={kompas.nyalakan} style={{ background: "transparent", color: C.green, padding: 0, fontSize: 12, textDecoration: "underline" }}>Coba nyalakan</button>
                  </>}
            </div>
          )}
        </div>
        {tracking ? (
          <button className="btn" onClick={berhentiLokasi} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "9px 16px", borderRadius: 11 }}>Matikan</button>
        ) : (
          <button className="btn" onClick={mulaiLokasi} style={{ background: C.green, color: "#fff", padding: "9px 16px", borderRadius: 11 }}><LocateFixed size={16} /> Aktifkan Lokasi Saya</button>
        )}
      </div>

      {/* titik kumpul */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em", color: C.green }}><Flag size={16} /> Titik Kumpul</span>
        {bolehKelola && <button className="btn" onClick={() => setModal("kumpul")} style={{ background: C.greenSoft, color: C.green, padding: "7px 13px", borderRadius: 10, fontSize: 12.5 }}><Plus size={15} /> Tambah</button>}
      </div>
      {titikKumpul.length === 0 ? (
        <div style={{ fontSize: 12.5, color: C.muted, background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 24 }}>
          Belum ada titik kumpul. Tekan <strong>Tambah</strong> saat Anda berdiri di lokasi kumpul agar koordinatnya tersimpan tepat.
        </div>
      ) : (
        <div className="kartu-grid" style={{ marginBottom: 24 }}>
          {titikKumpul.map((t) => (
            <TitikCard key={t.id} arahHP={kompas.arah} pos={pos} lat={t.lat} lng={t.lng} nama={t.nama} catatan={t.catatan} gambar={t.gambar} accent={C.green} accentBg={C.greenSoft} icon={Flag}
              footer={<button className="btn" onClick={() => setTitikKumpul((s) => s.filter((x) => x.id !== t.id))} style={{ marginTop: 10, background: C.bg, color: C.muted, padding: "6px 11px", borderRadius: 9, fontSize: 11.5 }}><Trash2 size={13} /> Hapus</button>} />
          ))}
        </div>
      )}

      {/* titik penting */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em", color: C.goldDeep }}><Landmark size={16} /> Lokasi Penting</span>
        {bolehKelola && <button className="btn" onClick={() => setModal("penting")} style={{ background: C.goldSoft, color: C.goldDeep, padding: "7px 13px", borderRadius: 10, fontSize: 12.5 }}><Plus size={15} /> Tambah</button>}
      </div>
      <div className="kartu-grid">
        {titikPenting.map((t) => (
          <TitikCard key={t.id} arahHP={kompas.arah} pos={pos} lat={t.lat} lng={t.lng} nama={t.nama} catatan={t.catatan} gambar={t.gambar} accent={C.goldDeep} accentBg={C.goldSoft} icon={Landmark}
            footer={<button className="btn" onClick={() => setTitikPenting((s) => s.filter((x) => x.id !== t.id))} style={{ marginTop: 10, background: C.bg, color: C.muted, padding: "6px 11px", borderRadius: 9, fontSize: 11.5 }}><Trash2 size={13} /> Hapus</button>} />
        ))}
      </div>

      {modal === "kumpul" && <TitikModal judul="Tambah Titik Kumpul" ikon={Flag} warna={C.green} contohNama="cth. Pintu King Abdul Aziz (Gate 1)" onClose={() => setModal(null)} onSave={(t) => { setTitikKumpul((s) => [...s, t]); setModal(null); }} />}
      {modal === "penting" && <TitikModal judul="Tambah Lokasi Penting" ikon={Landmark} warna={C.goldDeep} contohNama="cth. Hotel Al-Massa, Makkah" onClose={() => setModal(null)} onSave={(t) => { setTitikPenting((s) => [...s, t]); setModal(null); }} />}
    </div>
  );
}

function TitikCard({ pos, lat, lng, nama, catatan, accent, accentBg, icon: Icon, footer, avatarFoto, gambar, arahHP }) {
  const punyaPos = pos && lat != null && lng != null;
  const jarak = punyaPos ? jarakMeter(pos.lat, pos.lng, lat, lng) : null;
  const arah = punyaPos ? bearingDerajat(pos.lat, pos.lng, lat, lng) : null;
  // Kalau sensor arah HP aktif, panah diputar relatif terhadap arah hadap HP
  const pakaiKompas = punyaPos && arahHP != null;
  const putaran = punyaPos ? (pakaiKompas ? (arah - arahHP + 360) % 360 : arah) : 0;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 15 }}>
      {gambar && <img src={gambar.data} alt={nama} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 11, marginBottom: 12, display: "block" }} />}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        {avatarFoto !== undefined ? <Avatar foto={avatarFoto} nama={nama} size={38} /> : (
          <div style={{ width: 38, height: 38, borderRadius: 10, background: accentBg, color: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={19} /></div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{nama}</div>
          <div style={{ fontSize: 11.5, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>{catatan}</div>
        </div>
      </div>

      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        {punyaPos ? (
          <>
            <div style={{
              width: 50, height: 50, borderRadius: 99, flexShrink: 0, position: "relative",
              border: `2px solid ${pakaiKompas ? accent : accent + "33"}`,
              background: pakaiKompas ? accent + "0f" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* penanda Utara ikut berputar mengikuti arah HP */}
              {pakaiKompas && (
                <span style={{
                  position: "absolute", inset: 0,
                  transform: `rotate(${(360 - arahHP) % 360}deg)`,
                  transition: "transform .18s linear",
                }}>
                  <span style={{ position: "absolute", top: 1, left: "50%", transform: "translateX(-50%)", fontSize: 8, fontWeight: 800, color: C.muted }}>U</span>
                </span>
              )}
              <Navigation size={21} color={accent} fill={pakaiKompas ? accent : "none"}
                style={{ transform: `rotate(${putaran}deg)`, transition: "transform .18s linear" }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: accent, lineHeight: 1 }}>{formatJarak(jarak)}</div>
              <div style={{ fontSize: 11.5, color: C.muted, marginTop: 3 }}>
                {pakaiKompas ? <><strong style={{ color: accent }}>{putarKeInstruksi(putaran)}</strong> · {arahMataAngin(arah)}</> : <>{arahMataAngin(arah)} · {Math.round(arah)}° dari Utara</>}
              </div>
            </div>
          </>
        ) : (
          <div style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 6 }}><Compass size={15} color={C.border} /> Aktifkan lokasi Anda untuk lihat jarak & arah</div>
        )}
      </div>

      {lat != null && lng != null && (
        <div style={{ display: "flex", gap: 7, marginTop: 11 }}>
          <a href={mapsRute(lat, lng)} target="_blank" rel="noreferrer" className="btn"
            style={{ flex: 1, justifyContent: "center", textDecoration: "none", background: C.greenSoft, color: C.green, padding: "8px 10px", borderRadius: 10, fontSize: 12.5 }}>
            <Route size={14} /> Rute
          </a>
          <a href={mapsCari(lat, lng)} target="_blank" rel="noreferrer" className="btn"
            style={{ flex: 1, justifyContent: "center", textDecoration: "none", background: C.bg, color: C.muted, border: `1px solid ${C.border}`, padding: "8px 10px", borderRadius: 10, fontSize: 12.5 }}>
            <MapIcon size={14} /> Peta
          </a>
        </div>
      )}
      {footer}
    </div>
  );
}

/* Mengubah sudut relatif menjadi kalimat arah yang mudah diikuti */
function putarKeInstruksi(d) {
  const a = ((d % 360) + 360) % 360;
  if (a < 20 || a > 340) return "Lurus ke depan";
  if (a < 70) return "Serong kanan";
  if (a < 110) return "Ke kanan";
  if (a < 160) return "Serong kanan belakang";
  if (a < 200) return "Putar balik";
  if (a < 250) return "Serong kiri belakang";
  if (a < 290) return "Ke kiri";
  return "Serong kiri";
}

function TitikModal({ judul, ikon: Ikon, warna, contohNama, onClose, onSave }) {
  const [nama, setNama] = useState("");
  const [catatan, setCatatan] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [gambar, setGambar] = useState(null);
  const [geoMsg, setGeoMsg] = useState("");
  const canSave = nama.trim() && lat && lng;

  const gunakanLokasiSaya = () => {
    if (!navigator.geolocation) { setGeoMsg("Perangkat ini tidak mendukung deteksi lokasi."); return; }
    setGeoMsg("Mendeteksi lokasi…");
    navigator.geolocation.getCurrentPosition(
      (p) => { setLat(String(p.coords.latitude)); setLng(String(p.coords.longitude)); setGeoMsg("Koordinat tersimpan dari lokasi Anda saat ini."); },
      () => setGeoMsg("Gagal mendapatkan lokasi. Coba lagi atau isi manual."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <Modal onClose={onClose} width={440}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}><Ikon size={18} color={warna} /> {judul}</h3>
          <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>
        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>Nama titik</label>
        <input className="field" style={{ ...inputStyle, marginBottom: 14 }} value={nama} onChange={(e) => setNama(e.target.value)} placeholder={contohNama} />
        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>Catatan (opsional)</label>
        <input className="field" style={{ ...inputStyle, marginBottom: 14 }} value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="cth. Kumpul 15 menit sebelum keberangkatan" />

        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>Foto penanda lokasi (opsional)</label>
        <div style={{ marginBottom: 14 }}><UploadGambar nilai={gambar} onChange={setGambar} tinggi={120} label="Unggah foto lokasi" /></div>
        <div style={{ fontSize: 11.5, color: C.muted, marginTop: -8, marginBottom: 14 }}>Foto sangat membantu jamaah mengenali titik kumpul di tempat yang ramai.</div>

        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>Koordinat</label>
        <button className="btn" onClick={gunakanLokasiSaya} style={{ background: C.greenSoft, color: C.green, padding: "9px 14px", borderRadius: 10, fontSize: 13, marginBottom: 8 }}><Crosshair size={16} /> Gunakan lokasi saya sekarang</button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 6 }}>
          <input className="field" style={inputStyle} placeholder="Lintang (lat)" value={lat} onChange={(e) => setLat(e.target.value)} />
          <input className="field" style={inputStyle} placeholder="Bujur (lng)" value={lng} onChange={(e) => setLng(e.target.value)} />
        </div>
        {geoMsg && <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>{geoMsg}</div>}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 }}>
          <button className="btn" onClick={onClose} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "10px 18px", borderRadius: 11 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave({ id: Date.now(), nama, catatan, gambar, lat: parseFloat(lat), lng: parseFloat(lng) })} style={{ background: canSave ? warna : C.border, color: "#fff", padding: "10px 20px", borderRadius: 11, cursor: canSave ? "pointer" : "not-allowed", fontWeight: 700 }}><Check size={16} /> Simpan</button>
        </div>
      </div>
    </Modal>
  );
}

/* ============================================================
   LAPORAN PAGE — riwayat + kirim ke Telegram
   ============================================================ */
const JENIS_LAPORAN = ["Umum", "Absensi", "Jamaah Tersesat", "Kesehatan", "Kegiatan"];
const LAP_STATUS = {
  terkirim: { label: "Terkirim", color: C.green, bg: C.greenSoft, icon: CheckCircle2 },
  gagal: { label: "Gagal kirim", color: C.danger, bg: C.dangerSoft, icon: XCircle },
  lokal: { label: "Tersimpan", color: C.muted, bg: C.bg, icon: FileText },
  mengirim: { label: "Mengirim…", color: C.blue, bg: C.blueSoft, icon: RefreshCw },
};
const escHtml = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const waktuLapWIB = (iso) => new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
const waktuLapAST = (iso) => new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Riyadh", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

function buildPesan(r) {
  return [
    `🕌 <b>KBIH Ibnu Aqil — Laporan</b>`,
    `━━━━━━━━━━━━━━`,
    `📋 Jenis: ${escHtml(r.jenis)}`,
    ``,
    `<b>${escHtml(r.judul)}</b>`,
    escHtml(r.isi),
    ``,
    `👤 Pencatat: <b>${escHtml(r.pencatat || "-")}</b>`,
    `🕐 ${waktuLapWIB(r.waktuISO)} WIB · ${waktuLapAST(r.waktuISO)} AST`,
  ].join("\n");
}
async function kirimTelegram(token, chatId, text) {
  const res = await fetch(`https://api.telegram.org/bot${token.trim()}/sendMessage`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId.trim(), text, parse_mode: "HTML" }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.description || `HTTP ${res.status}`);
  return data;
}

function LaporanPage({ laporan, setLaporan, tg, setTg, agenda, list, absen, periodeAktif }) {
  const [mode, setMode] = useState("list");
  const [showConfig, setShowConfig] = useState(!(tg.token && tg.chatId));
  const [detail, setDetail] = useState(null);
  const terkonfigurasi = !!(tg.token && tg.chatId);

  const proses = async (data, kirim) => {
    const entry = { id: Date.now(), ...data, waktuISO: new Date().toISOString(), status: kirim ? "mengirim" : "lokal" };
    setLaporan((l) => [entry, ...l]);
    setMode("list");
    if (!kirim) return;
    try { await kirimTelegram(tg.token, tg.chatId, buildPesan(entry)); setLaporan((l) => l.map((x) => (x.id === entry.id ? { ...x, status: "terkirim" } : x))); }
    catch (e) { setLaporan((l) => l.map((x) => (x.id === entry.id ? { ...x, status: "gagal", error: e.message } : x))); }
  };
  const kirimUlang = async (r) => {
    setLaporan((l) => l.map((x) => (x.id === r.id ? { ...x, status: "mengirim" } : x)));
    try { await kirimTelegram(tg.token, tg.chatId, buildPesan(r)); setLaporan((l) => l.map((x) => (x.id === r.id ? { ...x, status: "terkirim", error: null } : x))); }
    catch (e) { setLaporan((l) => l.map((x) => (x.id === r.id ? { ...x, status: "gagal", error: e.message } : x))); }
  };
  const hapus = (id) => setLaporan((l) => l.filter((x) => x.id !== id));

  if (mode === "form")
    return <LaporanForm tg={tg} terkonfigurasi={terkonfigurasi} agenda={agenda} list={list} absen={absen} onCancel={() => setMode("list")} onSubmit={proses} />;

  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div><h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Laporan & Riwayat</h2><p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Catat laporan kegiatan dan kirim ke grup/channel Telegram lewat bot.</p></div>
        <button className="btn" onClick={() => setMode("form")} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}><Plus size={18} /> Buat Laporan</button>
      </div>

      {/* KONFIG TELEGRAM */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 20, overflow: "hidden" }}>
        <button className="btn" onClick={() => setShowConfig((s) => !s)} style={{ width: "100%", justifyContent: "space-between", background: "transparent", padding: "14px 16px", borderRadius: 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Send size={17} color={terkonfigurasi ? C.green : C.muted} />
            <span style={{ fontWeight: 700 }}>Koneksi Telegram Bot</span>
            <Badge bg={terkonfigurasi ? C.greenSoft : C.bg} color={terkonfigurasi ? C.green : C.muted}>{terkonfigurasi ? "Terkonfigurasi" : "Belum diatur"}</Badge>
          </span>
          <ChevronRight size={18} color={C.muted} style={{ transform: showConfig ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
        </button>
        {showConfig && <TelegramConfig tg={tg} setTg={setTg} />}
      </div>

      {/* RIWAYAT */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em", color: C.ink }}><Clock size={16} /> Riwayat Laporan ({laporan.length})</div>
      {laporan.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}><FileText size={32} color={C.border} /><p style={{ marginTop: 12, fontWeight: 600 }}>Belum ada laporan.</p></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {laporan.map((r) => {
            const st = LAP_STATUS[r.status] || LAP_STATUS.lokal;
            return (
              <div key={r.id} className="card-hover" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 15 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 5 }}>
                      <Badge bg={C.greenSoft} color={C.green}>{r.jenis}</Badge>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: st.bg, color: st.color, fontSize: 11.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>
                        <st.icon size={12} className={r.status === "mengirim" ? "spin" : ""} /> {st.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{r.judul}</div>
                    <div style={{ fontSize: 13, color: C.muted, marginTop: 3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.isi}</div>
                    <div style={{ display: "flex", gap: 14, marginTop: 9, fontSize: 12, color: C.muted, flexWrap: "wrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><User size={13} /> {r.pencatat || "—"}</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Clock size={13} /> {waktuLapWIB(r.waktuISO)} WIB</span>
                    </div>
                    {r.status === "gagal" && r.error && <div style={{ fontSize: 11.5, color: C.danger, marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}><AlertTriangle size={12} /> {r.error}</div>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                    <button className="btn iconbtn" onClick={() => setDetail(r)} title="Lihat" style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Eye size={15} /></button>
                    {(r.status === "gagal" || r.status === "lokal") && (
                      <button className="btn" onClick={() => kirimUlang(r)} disabled={!terkonfigurasi} title={terkonfigurasi ? "" : "Atur koneksi Telegram dulu"} style={{ background: terkonfigurasi ? C.green : C.border, color: "#fff", padding: "7px 11px", borderRadius: 9, fontSize: 12 }}><Send size={13} /> Kirim</button>
                    )}
                    <button className="btn iconbtn" onClick={() => hapus(r.id)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {detail && (
        <Modal onClose={() => setDetail(null)} width={480}>
          <div style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div><Badge bg={C.greenSoft} color={C.green}>{detail.jenis}</Badge><h3 style={{ margin: "8px 0 0", fontSize: 18, fontWeight: 700 }}>{detail.judul}</h3></div>
              <button className="btn iconbtn" onClick={() => setDetail(null)} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", color: C.ink, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "14px 0", margin: "6px 0 14px" }}>{detail.isi}</div>
            <div style={{ fontSize: 13, color: C.muted, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><User size={14} /> Pencatat: <strong style={{ color: C.ink }}>{detail.pencatat || "—"}</strong></span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Clock size={14} /> {waktuLapWIB(detail.waktuISO)} WIB · {waktuLapAST(detail.waktuISO)} AST</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function TelegramConfig({ tg, setTg }) {
  const [f, setF] = useState(tg);
  useEffect(() => { setF((s) => (s.token || s.chatId ? s : tg)); }, [tg]);
  const [testMsg, setTestMsg] = useState("");
  const [testing, setTesting] = useState(false);
  const [ubahToken, setUbahToken] = useState(false);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const simpan = () => { setTg(f); setUbahToken(false); setTestMsg("Konfigurasi tersimpan untuk sesi ini."); };
  const tes = async () => {
    if (!f.token || !f.chatId) { setTestMsg("Bot Token dan Chat ID belum lengkap."); return; }
    setTg(f); setTesting(true); setTestMsg("Mengirim pesan tes…");
    try { await kirimTelegram(f.token, f.chatId, "✅ <b>Tes koneksi KBIH Ibnu Aqil</b>\nBot berhasil terhubung."); setTestMsg("Berhasil! Cek Telegram Anda — pesan tes sudah masuk."); }
    catch (e) { setTestMsg("Gagal: " + e.message); }
    setTesting(false);
  };

  return (
    <div style={{ padding: "4px 16px 18px", borderTop: `1px solid ${C.border}` }}>
      <div style={{ background: C.bg, borderRadius: 12, padding: "12px 14px", margin: "14px 0", fontSize: 12.5, color: C.muted, display: "flex", gap: 8 }}>
        <ShieldAlert size={26} color={C.gold} style={{ flexShrink: 0 }} />
        <span>Token tidak ditulis di dalam kode aplikasi. Pengaturan ini tersimpan di server dan hanya bisa dibaca pembimbing yang sudah login — cukup diisi <strong>sekali</strong>, lalu berlaku untuk semua pembimbing. Cara membuat bot: chat <strong>@BotFather</strong> → <strong>/newbot</strong>.</span>
      </div>

      {/* token tersembunyi */}
      <Label>Bot Token</Label>
      {!ubahToken ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 13px", border: `1px solid ${C.border}`, borderRadius: 11, background: C.bg, marginBottom: 12 }}>
          <ShieldAlert size={17} color={f.token ? C.green : C.muted} />
          <span style={{ flex: 1, fontSize: 13, color: f.token ? C.ink : C.muted, letterSpacing: ".08em" }}>
            {f.token ? "••••••••••••••••••••••  (tersembunyi)" : "Belum diisi"}
          </span>
          <button className="btn" onClick={() => setUbahToken(true)} style={{ background: "#fff", border: `1px solid ${C.border}`, color: C.muted, padding: "6px 12px", borderRadius: 9, fontSize: 12 }}><Pencil size={13} /> Ubah</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input className="field" type="password" autoFocus style={{ ...inputStyle, flex: 1 }} value={f.token} onChange={(e) => set("token", e.target.value)} placeholder="123456789:AA..." />
          <button className="btn" onClick={() => { setF((s) => ({ ...s, token: tg.token })); setUbahToken(false); }} style={{ background: C.bg, color: C.muted, padding: "0 14px", borderRadius: 11 }}>Batal</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div><Label>Chat ID (grup / channel)</Label><input className="field" style={inputStyle} value={f.chatId} onChange={(e) => set("chatId", e.target.value)} placeholder="cth. -1001234567890" /></div>
        <div><Label>Nama pencatat / petugas</Label><input className="field" style={inputStyle} value={f.pencatat} onChange={(e) => set("pencatat", e.target.value)} placeholder="cth. Ustadz Fulan" /></div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14, alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn" onClick={simpan} style={{ background: C.greenSoft, color: C.green, padding: "9px 16px", borderRadius: 11 }}><Check size={16} /> Simpan</button>
        <button className="btn" onClick={tes} disabled={testing} style={{ background: C.green, color: "#fff", padding: "9px 16px", borderRadius: 11 }}>{testing ? <RefreshCw size={16} className="spin" /> : <Send size={16} />} Kirim tes</button>
        {testMsg && <span style={{ fontSize: 12.5, color: /gagal/i.test(testMsg) ? C.danger : C.muted }}>{testMsg}</span>}
      </div>
    </div>
  );
}

function LaporanForm({ tg, terkonfigurasi, agenda, list, absen, onCancel, onSubmit }) {
  const [f, setF] = useState({ jenis: "Umum", judul: "", isi: "", pencatat: tg.pencatat || "" });
  useEffect(() => { setF((s) => (s.pencatat ? s : { ...s, pencatat: tg.pencatat || "" })); }, [tg.pencatat]);
  const [agSel, setAgSel] = useState("");
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const canSave = f.judul.trim() && f.isi.trim() && f.pencatat.trim();

  const sisip = (teks) => setF((s) => ({ ...s, isi: s.isi ? s.isi + "\n\n" + teks : teks }));
  const genRingkasan = () => { const lansia = list.filter((j) => (hitungUsia(j.tanggalLahir) ?? 0) >= 60).length; const kr = list.filter((j) => j.kursiRoda).length; sisip(`Ringkasan jamaah:\n- Total jamaah: ${list.length}\n- Lansia (60+): ${lansia}\n- Pengguna kursi roda: ${kr}`); };
  const genKondisi = () => {
    const hariIni = new Date().toISOString().slice(0, 10);
    const baris = [];
    list.forEach((j) => {
      const hari = (j.catatanHarian || []).filter((c) => c.tanggal === hariIni);
      if (!hari.length) return;
      const t = hari.sort((a, b) => (b.waktuISO || "").localeCompare(a.waktuISO || ""))[0];
      const k = KONDISI[t.kondisi]?.label || "-";
      const rinci = t.isi || "";
      baris.push(`- ${j.nama} [${k}]${rinci ? `: ${rinci}` : ""}`);
    });
    if (!baris.length) return sisip("Belum ada catatan kondisi jamaah untuk hari ini.");
    const perluPerhatian = list.filter((j) => {
      const t = catatanTerakhir(j);
      return t && (t.kondisi === "sakit" || t.kondisi === "perhatian");
    }).length;
    sisip([`Kondisi jamaah hari ini (${baris.length} tercatat, ${perluPerhatian} perlu perhatian):`, ...baris].join("\n"));
  };

  const genAbsensi = () => { const ag = agenda.find((a) => a.id === Number(agSel)); if (!ag) return; const rec = absen[ag.id] || {}; const grp = (st) => list.filter((j) => rec[j.id] === st).map((j) => j.nama); const h = grp("hadir"), iz = grp("izin"), t = grp("tidak"); sisip([`Absensi — ${ag.judul} (${tglRingkas(ag.tanggal)} ${ag.waktu || ""}):`, `Hadir (${h.length}): ${h.join(", ") || "-"}`, `Izin (${iz.length}): ${iz.join(", ") || "-"}`, `Tidak hadir (${t.length}): ${t.join(", ") || "-"}`].join("\n")); };

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>Buat Laporan</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><Label>Jenis laporan</Label><select className="field" style={inputStyle} value={f.jenis} onChange={(e) => set("jenis", e.target.value)}>{JENIS_LAPORAN.map((j) => <option key={j}>{j}</option>)}</select></div>
          <div><Label>Pencatat</Label><input className="field" style={inputStyle} value={f.pencatat} onChange={(e) => set("pencatat", e.target.value)} placeholder="Nama Anda / petugas" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Judul laporan</Label><input className="field" style={inputStyle} value={f.judul} onChange={(e) => set("judul", e.target.value)} placeholder="cth. Kondisi jamaah sore ini" /></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Isi laporan</Label>
            <textarea className="field" rows={6} style={{ ...inputStyle, resize: "vertical" }} value={f.isi} onChange={(e) => set("isi", e.target.value)} placeholder="Tulis laporan di sini…" />
          </div>
        </div>

        <div style={{ background: C.bg, borderRadius: 12, padding: "12px 14px", marginTop: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Sisipkan data otomatis:</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <button className="btn" onClick={genRingkasan} style={{ background: "#fff", border: `1px solid ${C.border}`, color: C.ink, padding: "7px 12px", borderRadius: 9, fontSize: 12.5 }}><Users size={14} /> Ringkasan jamaah</button>
            <button className="btn" onClick={genKondisi} style={{ background: "#fff", border: `1px solid ${C.border}`, color: C.ink, padding: "7px 12px", borderRadius: 9, fontSize: 12.5 }}><HeartPulse size={14} /> Kondisi jamaah hari ini</button>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <select className="field" style={{ ...inputStyle, padding: "7px 10px", width: "auto" }} value={agSel} onChange={(e) => setAgSel(e.target.value)}>
                <option value="">— pilih agenda —</option>
                {agenda.map((a) => <option key={a.id} value={a.id}>{a.judul}</option>)}
              </select>
              <button className="btn" onClick={genAbsensi} disabled={!agSel} style={{ background: agSel ? "#fff" : C.bg, border: `1px solid ${C.border}`, color: agSel ? C.ink : C.border, padding: "7px 12px", borderRadius: 9, fontSize: 12.5 }}><ClipboardCheck size={14} /> Rekap absensi</button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn" disabled={!canSave} onClick={() => onSubmit(f, false)} style={{ background: "#fff", color: canSave ? C.green : C.border, border: `1px solid ${canSave ? C.green : C.border}`, padding: "11px 18px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><FileText size={17} /> Simpan saja</button>
            <button className="btn" disabled={!canSave || !terkonfigurasi} title={terkonfigurasi ? "" : "Atur koneksi Telegram dulu"} onClick={() => onSubmit(f, true)} style={{ background: canSave && terkonfigurasi ? C.green : C.border, color: "#fff", padding: "11px 22px", borderRadius: 12, cursor: canSave && terkonfigurasi ? "pointer" : "not-allowed" }}><Send size={17} /> Kirim ke Telegram</button>
          </div>
        </div>
        {!terkonfigurasi && <div style={{ fontSize: 12, color: C.muted, marginTop: 10, textAlign: "right" }}>Atur koneksi Telegram di halaman ini untuk mengaktifkan pengiriman.</div>}
      </div>
    </div>
  );
}

/* ============================================================
   DOA PAGE — kumpulan doa, tulis & unggah, dengan pencarian
   ============================================================ */
function DoaPage({ doa, setDoa, kategori, setKategori, bolehKelola = true }) {
  const [mode, setMode] = useState("list");
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");
  const [kat, setKat] = useState("Semua");
  const [kelola, setKelola] = useState(false);
  const [impor, setImpor] = useState(false);

  const hasil = useMemo(() => {
    const s = q.trim().toLowerCase();
    return doa.filter((d) => {
      if (kat !== "Semua" && d.kategori !== kat) return false;
      if (!s) return true;
      return [d.judul, d.kategori, d.latin, d.arti, d.catatan, d.arab].join(" ").toLowerCase().includes(s);
    });
  }, [doa, q, kat]);

  const simpan = (d) => {
    if (d.id) setDoa((l) => l.map((x) => (x.id === d.id ? d : x)));
    else setDoa((l) => [...l, { ...d, id: Date.now() }]);
    setMode("list");
  };
  const hapus = (id) => { if (window.confirm("Hapus doa ini?")) setDoa((l) => l.filter((x) => x.id !== id)); };

  if (mode === "form") return <DoaForm initial={editing} kategoriAda={kategori} onCancel={() => setMode("list")} onSave={simpan} />;

  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div><h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Kumpulan Doa</h2><p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Panduan doa & bacaan manasik untuk pembimbing dan jamaah.</p></div>
        {bolehKelola && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn" onClick={() => setImpor(true)}
              style={{ background: "#fff", color: C.green, border: `1px solid ${C.green}44`, padding: "10px 15px", borderRadius: 12, fontSize: 13 }}>
              <FileSpreadsheet size={17} /> Impor / Template
            </button>
            <button className="btn" onClick={() => { setEditing(null); setMode("form"); }} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}>
              <Plus size={18} /> Tambah Doa
            </button>
          </div>
        )}
      </div>

      <FilterKategori q={q} setQ={setQ} kat={kat} setKat={setKat} kategori={kategori}
        onKelola={() => setKelola(true)} jumlah={hasil.length} total={doa.length} bolehKelola={bolehKelola}
        placeholder="Cari doa — judul, bacaan latin, arti, atau catatan…" />

      {hasil.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}>
          <BookOpen size={32} color={C.border} /><p style={{ marginTop: 12, fontWeight: 600 }}>Tidak ada doa yang cocok.</p>
          <p style={{ margin: "4px 0 0", fontSize: 13 }}>Coba kata kunci lain atau ubah kategori.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {hasil.map((d) => (
            <div key={d.id} className="kartu-pad" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                <div>
                  {d.kategori && <Badge bg={C.goldSoft} color={C.goldDeep} icon={BookOpen}>{d.kategori}</Badge>}
                  <div style={{ fontSize: 16.5, fontWeight: 700, marginTop: 7 }}>{d.judul}</div>
                </div>
                {bolehKelola && (
                  <div style={{ display: "flex", gap: 6, height: "fit-content" }}>
                    <button className="btn iconbtn" onClick={() => { setEditing(d); setMode("form"); }} title="Ubah" style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Pencil size={15} /></button>
                    <button className="btn iconbtn" onClick={() => hapus(d.id)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><Trash2 size={15} /></button>
                  </div>
                )}
              </div>

              {d.arab && (
                <div dir="rtl" lang="ar" className="arab" style={{ fontSize: 34, color: C.ink, background: C.greenSoft, borderRadius: 12, padding: "18px 18px 14px", marginBottom: 10 }}>
                  {d.arab}
                </div>
              )}
              {d.latin && <div style={{ fontSize: 14, fontStyle: "italic", color: C.green, marginBottom: 7, lineHeight: 1.6 }}>{d.latin}</div>}
              {d.arti && <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6 }}>"{d.arti}"</div>}
              {d.catatan && <div style={{ fontSize: 12.5, color: C.muted, marginTop: 9, display: "flex", gap: 6, alignItems: "flex-start" }}><StickyNote size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {d.catatan}</div>}
              {d.berkas && (
                <button className="btn" onClick={() => bukaBerkas(d.berkas)} style={{ marginTop: 12, background: C.dangerSoft, color: C.danger, padding: "8px 13px", borderRadius: 10, fontSize: 12.5 }}>
                  <Paperclip size={14} /> {d.berkas.nama}{d.berkas.ukuran ? <span style={{ fontWeight: 500, opacity: .8 }}> ({formatUkuran(d.berkas.ukuran)})</span> : null}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {kelola && (
        <KelolaKategoriModal kategori={kategori} setKategori={setKategori} items={doa} setItems={setDoa}
          judul="Kumpulan Doa" onClose={() => { setKelola(false); setKat("Semua"); }} />
      )}

      {impor && (
        <ImporModal judul="Doa" namaBerkas="doa" kolom={KOLOM_DOA}
          items={doa} setItems={setDoa} kategori={kategori} setKategori={setKategori}
          onClose={() => { setImpor(false); setKat("Semua"); }} />
      )}
    </div>
  );
}

function DoaForm({ initial, kategoriAda, onCancel, onSave }) {
  const [f, setF] = useState(initial || { kategori: "", judul: "", arab: "", latin: "", arti: "", catatan: "", berkas: null });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const canSave = f.judul.trim().length > 0;

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>{initial ? "Ubah Doa" : "Tambah Doa"}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <Label>Kategori</Label>
            <select className="field" style={inputStyle} value={f.kategori} onChange={(e) => set("kategori", e.target.value)}>
              <option value="">— tanpa kategori —</option>
              {kategoriAda.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div><Label req>Judul doa</Label><input className="field" style={inputStyle} value={f.judul} onChange={(e) => set("judul", e.target.value)} placeholder="cth. Doa Masuk Masjid" /></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Teks Arab</Label>
            <textarea className="field arab" dir="rtl" lang="ar" rows={3} style={{ ...inputStyle, resize: "vertical", fontSize: 28 }} value={f.arab} onChange={(e) => set("arab", e.target.value)} placeholder="اللَّهُمَّ ..." />
          </div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Bacaan latin</Label><textarea className="field" rows={2} style={{ ...inputStyle, resize: "vertical" }} value={f.latin} onChange={(e) => set("latin", e.target.value)} placeholder="Allahumma…" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Arti / terjemahan</Label><textarea className="field" rows={2} style={{ ...inputStyle, resize: "vertical" }} value={f.arti} onChange={(e) => set("arti", e.target.value)} placeholder="Ya Allah…" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Catatan pembimbing</Label><input className="field" style={inputStyle} value={f.catatan} onChange={(e) => set("catatan", e.target.value)} placeholder="cth. Dibaca saat memasuki Masjidil Haram" /></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Lampiran (tautan, opsional)</Label>
            <TautanBerkas nilai={f.berkas} onChange={(v) => set("berkas", v)} label="Tambah tautan lampiran" petunjuk="Bisa tautan lembar doa PDF, foto, atau rekaman audio dari Google Drive." />
            <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>Bisa untuk lembar doa PDF, foto tulisan tangan, atau rekaman audio bacaan.</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave(f)} style={{ background: canSave ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PEMASANGAN APLIKASI DI HP (PWA)
   ============================================================ */
function usePemasangan() {
  const [aba, setAba] = useState(null);
  const [terpasang, setTerpasang] = useState(false);

  useEffect(() => {
    const tangkap = (e) => { e.preventDefault(); setAba(e); };
    const sudah = () => { setTerpasang(true); setAba(null); };
    window.addEventListener("beforeinstallprompt", tangkap);
    window.addEventListener("appinstalled", sudah);
    if (window.matchMedia?.("(display-mode: standalone)").matches) setTerpasang(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", tangkap);
      window.removeEventListener("appinstalled", sudah);
    };
  }, []);

  const pasang = async () => {
    if (!aba) return;
    aba.prompt();
    try { await aba.userChoice; } catch { /* abaikan */ }
    setAba(null);
  };

  return { bisa: !!aba && !terpasang, terpasang, pasang };
}

function TanpaPeriode({ onBuka }) {
  return (
    <div className="fade" style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 18, padding: "48px 22px", textAlign: "center" }}>
      <LayoutGrid size={34} color={C.border} />
      <p style={{ margin: "14px 0 4px", fontWeight: 700, fontSize: 15.5 }}>Belum ada periode aktif</p>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: C.muted }}>Buat periode haji atau umroh terlebih dahulu untuk mulai mengelola data jamaah.</p>
      <button className="btn" onClick={onBuka} style={{ background: C.green, color: "#fff", padding: "11px 20px", borderRadius: 12 }}>
        <LayoutGrid size={17} /> Buka Halaman Periode
      </button>
    </div>
  );
}

/* ============================================================
   PERIODE PAGE — beranda pemilihan periode haji/umroh
   ============================================================ */
function PeriodePage({ periode, setPeriode, idAktif, onPilih, siap, bolehKelola = true }) {
  const [form, setForm] = useState(null);   // null | {} | data
  const [hapus, setHapus] = useState(null);

  const urut = [...periode].sort((a, b) => (b.berangkat || "").localeCompare(a.berangkat || ""));

  const simpan = (d) => {
    if (d.id) setPeriode((l) => l.map((x) => (x.id === d.id ? d : x)));
    else setPeriode((l) => [...l, { ...d, id: Date.now(), dibuat: new Date().toISOString() }]);
    setForm(null);
  };

  if (form !== null) return <PeriodeForm initial={form.id ? form : null} onCancel={() => setForm(null)} onSave={simpan} />;

  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Periode Haji & Umroh</h2>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Pilih periode untuk mengelola jamaah, agenda, kursi, dan laporannya.</p>
        </div>
        {bolehKelola && (
          <button className="btn" onClick={() => setForm({})} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}>
            <Plus size={18} /> Tambah Periode
          </button>
        )}
      </div>

      <div style={{ background: C.goldSoft, border: `1px solid ${C.gold}44`, borderRadius: 13, padding: "11px 14px", margin: "16px 0 20px", fontSize: 12.5, color: C.goldDeep, display: "flex", gap: 8, alignItems: "flex-start" }}>
        <BookOpen size={16} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>Data jamaah, kursi bis, agenda, absensi, lokasi, dan laporan <strong>terpisah untuk tiap periode</strong>. Kumpulan Doa dan Hukum Fiqh dipakai bersama oleh semua periode.</span>
      </div>

      {!siap ? (
        <div style={{ textAlign: "center", padding: 40, color: C.muted, fontSize: 13 }}>
          <Loader2 size={20} className="spin" color={C.green} /><div style={{ marginTop: 8 }}>Memuat periode…</div>
        </div>
      ) : urut.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}>
          <LayoutGrid size={32} color={C.border} />
          <p style={{ marginTop: 12, fontWeight: 600 }}>Belum ada periode.</p>
          <p style={{ margin: "4px 0 0", fontSize: 13 }}>Tekan "Tambah Periode" untuk memulai.</p>
        </div>
      ) : (
        <div className="kartu-grid">
          {urut.map((p) => {
            const aktif = String(p.id) === String(idAktif);
            const haji = p.jenis === "Haji";
            return (
              <div key={p.id} className="card-hover"
                style={{ background: C.surface, borderRadius: 18, padding: 17, border: `2px solid ${aktif ? C.green : C.border}`, position: "relative" }}>
                {aktif && (
                  <span style={{ position: "absolute", top: -10, left: 16, background: C.green, color: "#fff", fontSize: 10.5, fontWeight: 800, padding: "3px 10px", borderRadius: 99, letterSpacing: ".04em" }}>
                    SEDANG DIBUKA
                  </span>
                )}
                <div style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 9, marginTop: aktif ? 5 : 0 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: haji ? C.goldSoft : C.greenSoft, color: haji ? C.goldDeep : C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Moon size={19} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.3 }}>{p.nama}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{p.jenis} · {p.tahun || "—"}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                  {p.berangkat && <Badge bg={C.greenSoft} color={C.green} icon={CalendarDays}>Berangkat {tglRingkas(p.berangkat)}</Badge>}
                  {p.pulang && <Badge bg={C.bg} color={C.muted} icon={CalendarDays}>Pulang {tglRingkas(p.pulang)}</Badge>}
                </div>
                {p.catatan && <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.5, marginBottom: 12 }}>{p.catatan}</div>}

                <div style={{ display: "flex", gap: 7, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                  <button className="btn" onClick={() => onPilih(p.id)}
                    style={{ flex: 1, justifyContent: "center", background: aktif ? C.greenSoft : C.green, color: aktif ? C.green : "#fff", padding: "9px 12px", borderRadius: 10, fontSize: 13 }}>
                    {aktif ? <><Check size={15} /> Lanjutkan</> : <><ChevronRight size={15} /> Buka</>}
                  </button>
                  {bolehKelola && <>
                    <button className="btn iconbtn" onClick={() => setForm(p)} title="Ubah" style={{ background: C.bg, padding: 9, borderRadius: 10 }}><Pencil size={15} /></button>
                    <button className="btn iconbtn" onClick={() => setHapus(p)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 9, borderRadius: 10 }}><Trash2 size={15} /></button>
                  </>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {hapus && (
        <HapusPeriodeModal p={hapus} onClose={() => setHapus(null)}
          onSelesai={() => { setPeriode((l) => l.filter((x) => x.id !== hapus.id)); setHapus(null); }} />
      )}
    </div>
  );
}

function PeriodeForm({ initial, onCancel, onSave }) {
  const [f, setF] = useState(initial || { nama: "", jenis: "Umroh", tahun: String(new Date().getFullYear()), berangkat: "", pulang: "", catatan: "" });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const canSave = f.nama.trim().length > 0;

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 620, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>{initial ? "Ubah Periode" : "Tambah Periode"}</h2>
        <Grid>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label req>Nama periode</Label>
            <input className="field" style={inputStyle} value={f.nama} onChange={(e) => set("nama", e.target.value)} placeholder="cth. Umroh Reguler Agustus" />
          </div>
          <div>
            <Label>Jenis</Label>
            <select className="field" style={inputStyle} value={f.jenis} onChange={(e) => set("jenis", e.target.value)}>
              <option>Umroh</option><option>Haji</option>
            </select>
          </div>
          <div>
            <Label>Tahun</Label>
            <input className="field" style={inputStyle} value={f.tahun} onChange={(e) => set("tahun", e.target.value)} placeholder="cth. 2026" />
          </div>
          <div>
            <Label>Tanggal berangkat</Label>
            <input className="field" type="date" style={inputStyle} value={f.berangkat} onChange={(e) => set("berangkat", e.target.value)} />
          </div>
          <div>
            <Label>Tanggal pulang</Label>
            <input className="field" type="date" style={inputStyle} value={f.pulang} onChange={(e) => set("pulang", e.target.value)} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Catatan</Label>
            <textarea className="field" rows={2} style={{ ...inputStyle, resize: "vertical" }} value={f.catatan} onChange={(e) => set("catatan", e.target.value)} placeholder="cth. Rombongan A & B, 2 pembimbing" />
          </div>
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave(f)} style={{ background: canSave ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

function HapusPeriodeModal({ p, onClose, onSelesai }) {
  const [isi, setIsi] = useState(null);
  const [ketikan, setKetikan] = useState("");
  const [sibuk, setSibuk] = useState(false);

  useEffect(() => { hitungIsiPeriode(p.id).then(setIsi).catch(() => setIsi({})); }, [p.id]);

  const cocok = ketikan.trim().toLowerCase() === "hapus";
  const jalankan = async () => {
    setSibuk(true);
    try { await hapusPeriodeLengkap(p.id); onSelesai(); }
    catch (e) { alert("Gagal menghapus: " + pesanGalat(e)); setSibuk(false); }
  };

  return (
    <Modal onClose={sibuk ? () => {} : onClose} width={430}>
      <div style={{ padding: 22 }}>
        <div style={{ display: "flex", gap: 11, alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: C.dangerSoft, color: C.danger, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <AlertOctagon size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.danger }}>Hapus Periode Ini?</h3>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: C.muted }}>Tindakan ini <strong>tidak dapat dibatalkan</strong>.</p>
          </div>
        </div>

        <div style={{ background: C.bg, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{p.nama}</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 9 }}>Seluruh data di bawah ini akan ikut terhapus permanen:</div>
          {isi === null ? (
            <div style={{ fontSize: 12.5, color: C.muted, display: "flex", gap: 7, alignItems: "center" }}><Loader2 size={14} className="spin" /> Menghitung isi…</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 13 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Users size={14} color={C.danger} /> {isi.jamaah || 0} data jamaah</span>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><CalendarDays size={14} color={C.danger} /> {isi.agenda || 0} agenda</span>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><FileText size={14} color={C.danger} /> {isi.laporan || 0} laporan</span>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Bus size={14} color={C.danger} /> denah kursi, absensi, dan titik lokasi</span>
            </div>
          )}
        </div>

        <div style={{ background: C.greenSoft, borderRadius: 10, padding: "9px 12px", fontSize: 12, color: C.green, marginBottom: 14 }}>
          Kumpulan Doa dan Hukum Fiqh <strong>tidak</strong> terhapus — keduanya dipakai bersama semua periode.
        </div>

        <Label>Ketik <strong>HAPUS</strong> untuk menegaskan</Label>
        <input className="field" style={{ ...inputStyle, marginBottom: 16 }} value={ketikan} onChange={(e) => setKetikan(e.target.value)} placeholder="HAPUS" autoFocus />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button className="btn" onClick={onClose} disabled={sibuk} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "10px 18px", borderRadius: 11 }}>Batal</button>
          <button className="btn" onClick={jalankan} disabled={!cocok || sibuk}
            style={{ background: cocok && !sibuk ? C.danger : C.border, color: "#fff", padding: "10px 20px", borderRadius: 11, cursor: cocok && !sibuk ? "pointer" : "not-allowed" }}>
            {sibuk ? <Loader2 size={16} className="spin" /> : <Trash2 size={16} />} {sibuk ? "Menghapus…" : "Hapus Permanen"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ============================================================
   PENGELOLA KATEGORI (dipakai halaman Doa & Fiqh)
   ============================================================ */
function KelolaKategoriModal({ kategori, setKategori, items, setItems, judul, onClose }) {
  const [baru, setBaru] = useState("");
  const [ubahIdx, setUbahIdx] = useState(null);
  const [ubahTeks, setUbahTeks] = useState("");

  const jumlahDipakai = (nama) => items.filter((x) => x.kategori === nama).length;

  const tambah = () => {
    const n = baru.trim();
    if (!n) return;
    if (kategori.some((k) => k.toLowerCase() === n.toLowerCase())) return alert("Kategori itu sudah ada.");
    setKategori([...kategori, n]);
    setBaru("");
  };

  const simpanUbah = (i) => {
    const n = ubahTeks.trim();
    if (!n) return;
    const lama = kategori[i];
    if (n === lama) { setUbahIdx(null); return; }
    if (kategori.some((k, j) => j !== i && k.toLowerCase() === n.toLowerCase())) return alert("Kategori itu sudah ada.");
    setKategori(kategori.map((k, j) => (j === i ? n : k)));
    // Ikut memperbarui semua isi yang memakai kategori lama
    setItems((l) => l.map((x) => (x.kategori === lama ? { ...x, kategori: n } : x)));
    setUbahIdx(null);
  };

  const hapus = (i) => {
    const nama = kategori[i];
    const dipakai = jumlahDipakai(nama);
    const pesan = dipakai
      ? `Hapus kategori "${nama}"?\n\n${dipakai} isi yang memakai kategori ini tidak ikut terhapus, tetapi kategorinya akan dikosongkan.`
      : `Hapus kategori "${nama}"?`;
    if (!window.confirm(pesan)) return;
    setKategori(kategori.filter((_, j) => j !== i));
    if (dipakai) setItems((l) => l.map((x) => (x.kategori === nama ? { ...x, kategori: "" } : x)));
  };

  const geser = (i, arah) => {
    const j = i + arah;
    if (j < 0 || j >= kategori.length) return;
    const salin = [...kategori];
    [salin[i], salin[j]] = [salin[j], salin[i]];
    setKategori(salin);
  };

  return (
    <Modal onClose={onClose} width={430}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}><Tags size={18} color={C.green} /> Kelola Kategori</h3>
          <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>
        <p style={{ margin: "0 0 16px", fontSize: 12.5, color: C.muted }}>Kategori untuk {judul}. Mengubah nama kategori otomatis memperbarui semua isinya.</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input className="field" style={{ ...inputStyle, flex: 1 }} value={baru} onChange={(e) => setBaru(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && tambah()} placeholder="Nama kategori baru…" />
          <button className="btn" onClick={tambah} style={{ background: C.green, color: "#fff", padding: "0 15px", borderRadius: 11 }}><Plus size={17} /></button>
        </div>

        <div style={{ maxHeight: 320, overflow: "auto" }} className="kbih-scroll">
          {kategori.length === 0 ? (
            <div style={{ fontSize: 13, color: C.muted, textAlign: "center", padding: 20 }}>Belum ada kategori.</div>
          ) : kategori.map((k, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", border: `1px solid ${C.border}`, borderRadius: 11, marginBottom: 8, background: "#fff" }}>
              {ubahIdx === i ? (
                <>
                  <input className="field" autoFocus style={{ ...inputStyle, flex: 1, padding: "7px 10px" }} value={ubahTeks}
                    onChange={(e) => setUbahTeks(e.target.value)} onKeyDown={(e) => e.key === "Enter" && simpanUbah(i)} />
                  <button className="btn" onClick={() => simpanUbah(i)} style={{ background: C.green, color: "#fff", padding: "7px 10px", borderRadius: 9 }}><Check size={14} /></button>
                  <button className="btn" onClick={() => setUbahIdx(null)} style={{ background: C.bg, color: C.muted, padding: "7px 10px", borderRadius: 9 }}><X size={14} /></button>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <button className="btn iconbtn" onClick={() => geser(i, -1)} disabled={i === 0} title="Naik"
                      style={{ background: "transparent", color: i === 0 ? C.border : C.muted, padding: 1, borderRadius: 5 }}><ChevronRight size={13} style={{ transform: "rotate(-90deg)" }} /></button>
                    <button className="btn iconbtn" onClick={() => geser(i, 1)} disabled={i === kategori.length - 1} title="Turun"
                      style={{ background: "transparent", color: i === kategori.length - 1 ? C.border : C.muted, padding: 1, borderRadius: 5 }}><ChevronRight size={13} style={{ transform: "rotate(90deg)" }} /></button>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700 }}>{k}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{jumlahDipakai(k)} isi</div>
                  </div>
                  <button className="btn iconbtn" onClick={() => { setUbahIdx(i); setUbahTeks(k); }} title="Ubah nama"
                    style={{ background: C.bg, padding: 7, borderRadius: 9 }}><Pencil size={14} /></button>
                  <button className="btn iconbtn" onClick={() => hapus(i)} title="Hapus"
                    style={{ background: C.dangerSoft, color: C.danger, padding: 7, borderRadius: 9 }}><Trash2 size={14} /></button>
                </>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <button className="btn" onClick={onClose} style={{ background: C.green, color: "#fff", padding: "10px 20px", borderRadius: 11 }}>Selesai</button>
        </div>
      </div>
    </Modal>
  );
}

/* Baris filter kategori + pencarian, dipakai Doa & Fiqh */
function FilterKategori({ q, setQ, kat, setKat, kategori, onKelola, placeholder, jumlah, total, bolehKelola = true }) {
  return (
    <>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 14, marginBottom: 14 }}>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <Search size={17} color={C.muted} style={{ position: "absolute", left: 13, top: 12 }} />
          <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} style={{ ...inputStyle, paddingLeft: 40 }} />
          {q && <button className="btn iconbtn" onClick={() => setQ("")} style={{ position: "absolute", right: 8, top: 8, background: C.bg, padding: 6, borderRadius: 8 }}><X size={14} /></button>}
        </div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
          {["Semua", ...kategori].map((k) => {
            const on = kat === k;
            return <button key={k} className="btn" onClick={() => setKat(k)}
              style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.muted, padding: "6px 13px", borderRadius: 99, fontSize: 12.5, border: `1px solid ${on ? C.green : C.border}` }}>{k}</button>;
          })}
          {bolehKelola && (
            <button className="btn" onClick={onKelola} title="Kelola kategori"
              style={{ background: "#fff", color: C.green, border: `1px dashed ${C.green}66`, padding: "6px 12px", borderRadius: 99, fontSize: 12.5 }}>
              <Tags size={14} /> Kelola
            </button>
          )}
        </div>
      </div>
      <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 10 }}>Menampilkan {jumlah} dari {total}.</div>
    </>
  );
}

/* ============================================================
   FIQH PAGE — kumpulan hukum fiqh manasik
   ============================================================ */
function FiqhPage({ fiqh, setFiqh, kategori, setKategori, bolehKelola = true }) {
  const [mode, setMode] = useState("list");
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");
  const [kat, setKat] = useState("Semua");
  const [kelola, setKelola] = useState(false);
  const [impor, setImpor] = useState(false);

  const hasil = useMemo(() => {
    const s = q.trim().toLowerCase();
    return fiqh.filter((d) => {
      if (kat !== "Semua" && d.kategori !== kat) return false;
      if (!s) return true;
      return [d.judul, d.kategori, d.isi, d.dalil, d.rujukan, d.catatan].join(" ").toLowerCase().includes(s);
    });
  }, [fiqh, q, kat]);

  const simpan = (d) => {
    if (d.id) setFiqh((l) => l.map((x) => (x.id === d.id ? d : x)));
    else setFiqh((l) => [...l, { ...d, id: Date.now() }]);
    setMode("list");
  };
  const hapus = (id) => { if (window.confirm("Hapus catatan fiqh ini?")) setFiqh((l) => l.filter((x) => x.id !== id)); };

  if (mode === "form") return <FiqhForm initial={editing} kategori={kategori} onCancel={() => setMode("list")} onSave={simpan} />;

  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Hukum Fiqh</h2>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Rujukan hukum manasik untuk menjawab pertanyaan jamaah di lapangan.</p>
        </div>
        {bolehKelola && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn" onClick={() => setImpor(true)}
              style={{ background: "#fff", color: C.green, border: `1px solid ${C.green}44`, padding: "10px 15px", borderRadius: 12, fontSize: 13 }}>
              <FileSpreadsheet size={17} /> Impor / Template
            </button>
            <button className="btn" onClick={() => { setEditing(null); setMode("form"); }} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}>
              <Plus size={18} /> Tambah Catatan
            </button>
          </div>
        )}
      </div>

      <FilterKategori q={q} setQ={setQ} kat={kat} setKat={setKat} kategori={kategori}
        onKelola={() => setKelola(true)} jumlah={hasil.length} total={fiqh.length} bolehKelola={bolehKelola}
        placeholder="Cari hukum — judul, uraian, dalil, atau rujukan…" />

      {hasil.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}>
          <Scale size={32} color={C.border} />
          <p style={{ marginTop: 12, fontWeight: 600 }}>Tidak ada catatan yang cocok.</p>
          <p style={{ margin: "4px 0 0", fontSize: 13 }}>Coba kata kunci lain atau ubah kategori.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {hasil.map((d) => (
            <div key={d.id} className="kartu-pad" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                <div style={{ minWidth: 0 }}>
                  {d.kategori && <Badge bg={C.goldSoft} color={C.goldDeep} icon={Scale}>{d.kategori}</Badge>}
                  <div style={{ fontSize: 16.5, fontWeight: 700, marginTop: 7 }}>{d.judul}</div>
                </div>
                {bolehKelola && (
                  <div style={{ display: "flex", gap: 6, height: "fit-content" }}>
                    <button className="btn iconbtn" onClick={() => { setEditing(d); setMode("form"); }} title="Ubah" style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Pencil size={15} /></button>
                    <button className="btn iconbtn" onClick={() => hapus(d.id)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><Trash2 size={15} /></button>
                  </div>
                )}
              </div>

              {d.isi && <div style={{ fontSize: 14.5, lineHeight: 1.7, color: C.ink, whiteSpace: "pre-wrap" }}>{d.isi}</div>}

              {d.dalil && (
                <div style={{ background: C.greenSoft, borderRadius: 11, padding: "11px 13px", marginTop: 12, fontSize: 13.5, color: C.green, lineHeight: 1.6 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 4, opacity: .8 }}>Dalil</div>
                  {d.dalil}
                </div>
              )}
              {d.rujukan && <div style={{ fontSize: 12.5, color: C.muted, marginTop: 9, display: "flex", gap: 6, alignItems: "center" }}><BookOpen size={14} /> {d.rujukan}</div>}
              {d.catatan && <div style={{ fontSize: 12.5, color: C.muted, marginTop: 6, display: "flex", gap: 6, alignItems: "flex-start" }}><StickyNote size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {d.catatan}</div>}
              {d.berkas && (
                <button className="btn" onClick={() => bukaBerkas(d.berkas)} style={{ marginTop: 12, background: C.dangerSoft, color: C.danger, padding: "8px 13px", borderRadius: 10, fontSize: 12.5 }}>
                  <Paperclip size={14} /> {d.berkas.nama}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {kelola && (
        <KelolaKategoriModal kategori={kategori} setKategori={setKategori} items={fiqh} setItems={setFiqh}
          judul="Hukum Fiqh" onClose={() => { setKelola(false); setKat("Semua"); }} />
      )}

      {impor && (
        <ImporModal judul="Hukum Fiqh" namaBerkas="hukum-fiqh" kolom={KOLOM_FIQH}
          items={fiqh} setItems={setFiqh} kategori={kategori} setKategori={setKategori}
          onClose={() => { setImpor(false); setKat("Semua"); }} />
      )}
    </div>
  );
}

function FiqhForm({ initial, kategori, onCancel, onSave }) {
  const [f, setF] = useState(initial || { kategori: "", judul: "", isi: "", dalil: "", rujukan: "", catatan: "", berkas: null });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const canSave = f.judul.trim().length > 0;

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>{initial ? "Ubah Catatan Fiqh" : "Tambah Catatan Fiqh"}</h2>
        <Grid>
          <div>
            <Label>Kategori</Label>
            <select className="field" style={inputStyle} value={f.kategori} onChange={(e) => set("kategori", e.target.value)}>
              <option value="">— tanpa kategori —</option>
              {kategori.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label req>Judul</Label>
            <input className="field" style={inputStyle} value={f.judul} onChange={(e) => set("judul", e.target.value)} placeholder="cth. Rukun Umroh" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Uraian hukum</Label>
            <textarea className="field" rows={6} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} value={f.isi} onChange={(e) => set("isi", e.target.value)} placeholder="Tulis penjelasan hukumnya di sini…" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Dalil</Label>
            <textarea className="field" rows={3} style={{ ...inputStyle, resize: "vertical" }} value={f.dalil} onChange={(e) => set("dalil", e.target.value)} placeholder="Ayat, hadis, atau kaidah yang menjadi dasar…" />
          </div>
          <div>
            <Label>Rujukan kitab</Label>
            <input className="field" style={inputStyle} value={f.rujukan} onChange={(e) => set("rujukan", e.target.value)} placeholder="cth. Fikih Manasik — mazhab Syafi'i" />
          </div>
          <div>
            <Label>Catatan pembimbing</Label>
            <input className="field" style={inputStyle} value={f.catatan} onChange={(e) => set("catatan", e.target.value)} placeholder="cth. sering ditanyakan jamaah" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Lampiran (tautan, opsional)</Label>
            <TautanBerkas nilai={f.berkas} onChange={(v) => set("berkas", v)} label="Tambah tautan rujukan"
              petunjuk="Bisa tautan kitab PDF, artikel, atau rekaman kajian dari Google Drive." />
          </div>
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave(f)} style={{ background: canSave ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DARURAT — tombol panik
   ============================================================ */
function DaruratPage({ lokasi, tg, darurat, setDarurat, pengguna, namaSaya, periodeAktif, setLaporan }) {
  const [tahan, setTahan] = useState(0);        // 0..100
  const [proses, setProses] = useState(null);   // null | "jalan" | "selesai" | "gagal"
  const [pesanHasil, setPesanHasil] = useState([]);
  const [atur, setAtur] = useState(false);
  const timerRef = useRef(null);
  const mulaiRef = useRef(0);

  const kontak = darurat?.kontak || [];
  const utama = kontak[0] || null;
  const nama = namaSaya || "Pembimbing";

  const LAMA_TAHAN = 1500; // ms

  const mulaiTahan = () => {
    if (proses === "jalan") return;
    mulaiRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const lewat = Date.now() - mulaiRef.current;
      const persen = Math.min(100, (lewat / LAMA_TAHAN) * 100);
      setTahan(persen);
      if (persen >= 100) { hentikanTahan(); kirimDarurat(); }
    }, 30);
  };
  const hentikanTahan = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setTahan(0);
  };
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const kirimDarurat = async () => {
    setProses("jalan");
    setPesanHasil([]);
    const hasil = [];
    let p = null;

    // 1. Ambil koordinat
    try {
      p = await lokasi.ambilSekali();
      hasil.push({ ok: true, teks: `Koordinat didapat (±${Math.round(p.akurasi)} m)` });
    } catch (e) {
      hasil.push({ ok: false, teks: "Koordinat gagal diambil: " + (e.message || "tidak diketahui") });
    }

    const waktuISO = new Date().toISOString();
    const barisLokasi = p
      ? `📍 Koordinat: ${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}\n🗺 Peta: ${mapsCari(p.lat, p.lng)}`
      : "📍 Koordinat tidak tersedia (GPS mati atau izin ditolak)";

    const isiPesan = [
      "🚨 <b>SINYAL DARURAT — KBIH IBNU AQIL</b>",
      "━━━━━━━━━━━━━━",
      periodeAktif ? `Periode: ${escHtml(periodeAktif.nama)}` : "",
      `Dikirim oleh: <b>${escHtml(nama)}</b>`,
      "",
      barisLokasi,
      "",
      `🕐 ${waktuLapWIB(waktuISO)} WIB · ${waktuLapAST(waktuISO)} AST`,
      "",
      "<i>Mohon segera dihubungi.</i>",
    ].filter(Boolean).join("\n");

    // 2. Kirim ke Telegram
    if (tg?.token && tg?.chatId) {
      try {
        await kirimTelegram(tg.token, tg.chatId, isiPesan);
        hasil.push({ ok: true, teks: "Pesan darurat terkirim ke grup Telegram" });
      } catch (e) {
        hasil.push({ ok: false, teks: "Telegram gagal: " + (e.message || "tidak diketahui") });
      }
    } else {
      hasil.push({ ok: false, teks: "Telegram belum diatur — buka halaman Laporan untuk mengaturnya" });
    }

    // 3. Catat ke riwayat laporan
    try {
      setLaporan((l) => [{
        id: Date.now(),
        jenis: "Darurat",
        judul: "Sinyal darurat ditekan",
        isi: [
          "Tombol darurat ditekan dari halaman Darurat.",
          p ? `Koordinat: ${p.lat.toFixed(6)}, ${p.lng.toFixed(6)} (±${Math.round(p.akurasi)} m)` : "Koordinat tidak tersedia.",
          p ? `Peta: ${mapsCari(p.lat, p.lng)}` : "",
        ].filter(Boolean).join("\n"),
        pencatat: nama,
        waktuISO,
        status: tg?.token && tg?.chatId ? "terkirim" : "lokal",
      }, ...l]);
      hasil.push({ ok: true, teks: "Tercatat di riwayat laporan" });
    } catch { /* abaikan */ }

    setPesanHasil(hasil);
    setProses(hasil.some((h) => !h.ok) ? "gagal" : "selesai");

    // 4. Buka WhatsApp pembimbing
    if (utama?.nomor) {
      const teksWA = [
        "🚨 DARURAT — KBIH Ibnu Aqil",
        `Dari: ${nama}`,
        p ? `Lokasi saya: ${mapsCari(p.lat, p.lng)}` : "Lokasi tidak tersedia.",
        "Mohon segera dihubungi.",
      ].join("\n");
      const tautan = `${waLink(utama.nomor)}?text=${encodeURIComponent(teksWA)}`;
      setTimeout(() => window.open(tautan, "_blank", "noopener"), 400);
    }
  };

  const siap = !!(tg?.token && tg?.chatId) || kontak.length > 0;

  return (
    <div className="fade">
      <div style={{ marginBottom: 16 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600, color: C.danger }}>Tombol Darurat</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>
          Tekan dan tahan tombol untuk mengirim lokasi Anda ke grup Telegram dan menghubungi pembimbing lewat WhatsApp.
        </p>
      </div>

      {!siap && (
        <div style={{ background: C.goldSoft, border: `1px solid ${C.gold}55`, borderRadius: 13, padding: "12px 14px", marginBottom: 18, fontSize: 12.5, color: C.goldDeep, display: "flex", gap: 8 }}>
          <AlertTriangle size={17} style={{ flexShrink: 0 }} />
          <span>Belum ada tujuan darurat. Atur nomor WhatsApp pembimbing di bawah, dan pastikan koneksi Telegram sudah diisi di halaman Laporan.</span>
        </div>
      )}

      {/* TOMBOL BESAR */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0 22px" }}>
        <button
          onPointerDown={mulaiTahan}
          onPointerUp={hentikanTahan}
          onPointerLeave={hentikanTahan}
          onPointerCancel={hentikanTahan}
          onContextMenu={(e) => e.preventDefault()}
          disabled={proses === "jalan"}
          style={{
            width: 220, height: 220, borderRadius: "50%", border: "none", cursor: "pointer",
            position: "relative", overflow: "hidden", touchAction: "none", userSelect: "none",
            background: proses === "jalan"
              ? "#8c2f2f"
              : `radial-gradient(circle at 35% 30%, #d95252, ${C.danger} 60%, #8c2f2f 100%)`,
            boxShadow: `0 12px 34px rgba(178,59,59,.42), inset 0 -6px 14px rgba(0,0,0,.22)`,
            color: "#fff", fontFamily: "inherit",
            transform: tahan > 0 ? "scale(0.97)" : "scale(1)",
            transition: "transform .12s ease",
          }}>
          {/* isian saat ditahan */}
          <span style={{
            position: "absolute", left: 0, bottom: 0, width: "100%", height: `${tahan}%`,
            background: "rgba(255,255,255,.22)", transition: "height .03s linear",
          }} />
          <span style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {proses === "jalan"
              ? <Loader2 size={54} className="spin" />
              : <AlertOctagon size={54} />}
            <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: ".02em" }}>
              {proses === "jalan" ? "MENGIRIM…" : "DARURAT"}
            </span>
            <span style={{ fontSize: 11.5, fontWeight: 600, opacity: .9 }}>
              {proses === "jalan" ? "mohon tunggu" : tahan > 0 ? "terus tahan…" : "tekan & tahan 1,5 detik"}
            </span>
          </span>
        </button>

        <div style={{ marginTop: 14, fontSize: 12.5, color: C.muted, textAlign: "center", maxWidth: 320 }}>
          {lokasi.pos
            ? <>Lokasi siap: {lokasi.pos.lat.toFixed(5)}, {lokasi.pos.lng.toFixed(5)} (±{Math.round(lokasi.pos.akurasi)} m)</>
            : <>Lokasi akan diambil saat tombol ditekan. Untuk lebih cepat, aktifkan lokasi di halaman <strong>Lokasi</strong>.</>}
        </div>
      </div>

      {/* HASIL PENGIRIMAN */}
      {pesanHasil.length > 0 && (
        <div style={{ background: C.surface, border: `1px solid ${proses === "gagal" ? C.danger + "55" : C.green + "44"}`, borderRadius: 16, padding: 16, marginBottom: 18 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 10, color: proses === "gagal" ? C.danger : C.green, display: "flex", alignItems: "center", gap: 7 }}>
            {proses === "gagal" ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
            {proses === "gagal" ? "Sebagian gagal dikirim" : "Sinyal darurat terkirim"}
          </div>
          {pesanHasil.map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", fontSize: 12.5, color: h.ok ? C.ink : C.danger, marginBottom: 5 }}>
              {h.ok ? <Check size={14} color={C.green} style={{ marginTop: 2, flexShrink: 0 }} /> : <X size={14} style={{ marginTop: 2, flexShrink: 0 }} />}
              {h.teks}
            </div>
          ))}
          {lokasi.pos && (
            <div style={{ display: "flex", gap: 7, marginTop: 12, flexWrap: "wrap" }}>
              <a href={mapsCari(lokasi.pos.lat, lokasi.pos.lng)} target="_blank" rel="noreferrer" className="btn"
                style={{ textDecoration: "none", background: C.greenSoft, color: C.green, padding: "8px 13px", borderRadius: 10, fontSize: 12.5 }}>
                <MapIcon size={14} /> Buka lokasi saya di Peta
              </a>
              {utama?.nomor && (
                <a href={waLink(utama.nomor)} target="_blank" rel="noreferrer" className="btn"
                  style={{ textDecoration: "none", background: "#e4f4ea", color: "#1f9d55", padding: "8px 13px", borderRadius: 10, fontSize: 12.5 }}>
                  <MessageCircle size={14} /> Buka WhatsApp {utama.nama}
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* KONTAK DARURAT */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
        <button className="btn" onClick={() => setAtur((a) => !a)}
          style={{ width: "100%", justifyContent: "space-between", background: "transparent", padding: "14px 16px", borderRadius: 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Phone size={17} color={kontak.length ? C.green : C.muted} />
            <span style={{ fontWeight: 700 }}>Kontak Darurat</span>
            <Badge bg={kontak.length ? C.greenSoft : C.bg} color={kontak.length ? C.green : C.muted}>
              {kontak.length ? `${kontak.length} kontak` : "Belum diatur"}
            </Badge>
          </span>
          <ChevronRight size={18} color={C.muted} style={{ transform: atur ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
        </button>

        {atur && (
          <div style={{ padding: "4px 16px 18px", borderTop: `1px solid ${C.border}` }}>
            <p style={{ margin: "12px 0 12px", fontSize: 12.5, color: C.muted }}>
              Kontak <strong>paling atas</strong> akan otomatis dibuka di WhatsApp saat tombol darurat ditekan. Gunakan tanda panah untuk mengubah urutan.
            </p>
            {kontak.map((k, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <button className="btn iconbtn" disabled={i === 0} title="Naik"
                    onClick={() => { const s = [...kontak]; [s[i - 1], s[i]] = [s[i], s[i - 1]]; setDarurat({ ...darurat, kontak: s }); }}
                    style={{ background: "transparent", color: i === 0 ? C.border : C.muted, padding: 1, borderRadius: 5 }}>
                    <ChevronRight size={13} style={{ transform: "rotate(-90deg)" }} />
                  </button>
                  <button className="btn iconbtn" disabled={i === kontak.length - 1} title="Turun"
                    onClick={() => { const s = [...kontak]; [s[i + 1], s[i]] = [s[i], s[i + 1]]; setDarurat({ ...darurat, kontak: s }); }}
                    style={{ background: "transparent", color: i === kontak.length - 1 ? C.border : C.muted, padding: 1, borderRadius: 5 }}>
                    <ChevronRight size={13} style={{ transform: "rotate(90deg)" }} />
                  </button>
                </div>
                <input className="field" style={{ ...inputStyle, flex: 1 }} value={k.nama} placeholder="Nama"
                  onChange={(e) => { const s = [...kontak]; s[i] = { ...s[i], nama: e.target.value }; setDarurat({ ...darurat, kontak: s }); }} />
                <input className="field" style={{ ...inputStyle, flex: 1 }} value={k.nomor} placeholder="08xx-xxxx-xxxx"
                  onChange={(e) => { const s = [...kontak]; s[i] = { ...s[i], nomor: e.target.value }; setDarurat({ ...darurat, kontak: s }); }} />
                <button className="btn iconbtn" title="Hapus"
                  onClick={() => setDarurat({ ...darurat, kontak: kontak.filter((_, j) => j !== i) })}
                  style={{ background: C.dangerSoft, color: C.danger, padding: 9, borderRadius: 10 }}><X size={15} /></button>
              </div>
            ))}
            <button className="btn" onClick={() => setDarurat({ ...darurat, kontak: [...kontak, { nama: "", nomor: "" }] })}
              style={{ background: C.greenSoft, color: C.green, padding: "9px 15px", borderRadius: 11, marginTop: 4 }}>
              <UserPlus size={16} /> Tambah Kontak
            </button>
          </div>
        )}
      </div>

      <div style={{ background: C.bg, borderRadius: 13, padding: "13px 15px", marginTop: 16, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
        <strong style={{ color: C.ink }}>Yang terjadi saat tombol ditekan:</strong><br />
        1. Koordinat GPS diambil saat itu juga<br />
        2. Pesan berisi koordinat & tautan peta dikirim ke grup Telegram<br />
        3. Kejadian dicatat di riwayat laporan<br />
        4. WhatsApp kontak pertama terbuka dengan pesan siap kirim
      </div>
    </div>
  );
}

/* ============================================================
   KONTAK — daftar jamaah ringkas untuk menghubungi cepat
   ============================================================ */
function KontakPage({ list, bolehKelola = true }) {
  const [q, setQ] = useState("");
  const [rombongan, setRombongan] = useState("Semua");

  const daftarRombongan = useMemo(
    () => ["Semua", ...Array.from(new Set(list.map((j) => j.rombongan).filter(Boolean))).sort()],
    [list]
  );

  const hasil = useMemo(() => {
    const s = q.trim().toLowerCase();
    return list
      .filter((j) => {
        if (rombongan !== "Semua" && j.rombongan !== rombongan) return false;
        if (!s) return true;
        return [j.nama, j.telepon, j.rombongan].join(" ").toLowerCase().includes(s);
      })
      .sort((a, b) => (a.nama || "").localeCompare(b.nama || "", "id"));
  }, [list, q, rombongan]);

  const adaNomor = list.filter((j) => j.telepon).length;

  return (
    <div className="fade">
      <div style={{ marginBottom: 16 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Kontak Jamaah</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>
          {bolehKelola
            ? <>Daftar ringkas untuk menghubungi jamaah dengan cepat. {adaNomor} dari {list.length} jamaah punya nomor.</>
            : <>Daftar sesama jamaah dalam rombongan Anda. {list.length} orang terdaftar.</>}
        </p>
        {!bolehKelola && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.bg, color: C.muted, borderRadius: 9, padding: "6px 11px", fontSize: 11.5, marginTop: 9 }}>
            <Lock size={12} /> Hanya bisa dilihat — data pribadi jamaah lain tidak ditampilkan
          </div>
        )}
      </div>

      {/* pencarian & saringan */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 14, marginBottom: 14 }}>
        <div style={{ position: "relative", marginBottom: daftarRombongan.length > 1 ? 12 : 0 }}>
          <Search size={17} color={C.muted} style={{ position: "absolute", left: 13, top: 12 }} />
          <input className="field" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama atau nomor…" style={{ ...inputStyle, paddingLeft: 40 }} />
          {q && <button className="btn iconbtn" onClick={() => setQ("")}
            style={{ position: "absolute", right: 8, top: 8, background: C.bg, padding: 6, borderRadius: 8 }}><X size={14} /></button>}
        </div>
        {daftarRombongan.length > 1 && (
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {daftarRombongan.map((r) => {
              const on = rombongan === r;
              return (
                <button key={r} className="btn" onClick={() => setRombongan(r)}
                  style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.muted, padding: "6px 13px", borderRadius: 99, fontSize: 12.5, border: `1px solid ${on ? C.green : C.border}` }}>
                  {r === "Semua" ? "Semua" : `Rombongan ${r}`}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {hasil.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}>
          <Phone size={32} color={C.border} />
          <p style={{ marginTop: 12, fontWeight: 600 }}>Tidak ada jamaah yang cocok.</p>
        </div>
      ) : (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
          {hasil.map((j, i) => (
            <div key={j.id}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
              }}>
              <Avatar foto={j.foto} nama={j.nama} size={46} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {j.nama}
                </div>
                <div style={{ fontSize: 12.5, color: j.telepon ? C.muted : C.border, marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                  <Phone size={12} /> {j.telepon || "nomor belum diisi"}
                  {j.rombongan && <span style={{ color: C.green, fontWeight: 700 }}>· Rmb {j.rombongan}</span>}
                </div>
              </div>
              <ContactBtns tel={j.telepon} size={38} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   PENGATURAN AKUN
   ============================================================ */
const PERAN = {
  Pembimbing: { warna: "#0f5c37", latar: "#e7f0ea", ikon: ShieldCheck, ket: "Akses penuh ke seluruh data" },
  Jamaah: { warna: "#2f7fa8", latar: "#e6f0f5", ikon: User, ket: "Melihat daftar jamaah & agenda, mengelola kartunya sendiri" },
};

function PengaturanPage({ pengguna, akunSaya, list = [], pid, periodeAktif }) {
  const [akun, setAkun, siapAkun] = useKoleksiTersinkron("akun", []);
  const [buat, setBuat] = useState(false);
  const [pesan, setPesan] = useState(null);

  const susun = (daftar) => [...daftar].sort((a, b) => {
    if (a.aktif !== b.aktif) return a.aktif ? -1 : 1;
    return (a.nama || a.email || "").localeCompare(b.nama || b.email || "", "id");
  });
  const akunPembimbing = susun(akun.filter((a) => (a.peran || "Pembimbing") !== "Jamaah"));
  const akunJamaah = susun(akun.filter((a) => a.peran === "Jamaah"));

  const sayaTerdaftar = akun.some((a) => a.id === pengguna.uid);

  const daftarkanDiri = () => {
    setAkun((l) => [...l, {
      id: pengguna.uid,
      email: pengguna.email,
      nama: pengguna.email?.split("@")[0] || "Pembimbing",
      peran: "Pembimbing",
      aktif: true,
      dibuat: new Date().toISOString(),
      dibuatOleh: pengguna.email,
    }]);
    setPesan({ ok: true, teks: "Akun Anda sudah tercatat sebagai Pembimbing." });
  };

  const ubahAktif = (a) => {
    if (a.id === pengguna.uid) {
      alert("Anda tidak bisa menonaktifkan akun Anda sendiri.");
      return;
    }
    const jadi = !a.aktif;
    const tanya = jadi
      ? `Aktifkan kembali akun ${a.email}?`
      : `Nonaktifkan akun ${a.email}?\n\nOrang ini masih bisa masuk, tetapi tidak akan bisa membuka data apa pun.`;
    if (!window.confirm(tanya)) return;
    setAkun((l) => l.map((x) => (x.id === a.id ? { ...x, aktif: jadi } : x)));
    setPesan({ ok: true, teks: jadi ? `Akun ${a.email} diaktifkan kembali.` : `Akun ${a.email} dinonaktifkan.` });
  };

  // Satu akun hanya boleh untuk satu jamaah, dan sebaliknya
  const terpakai = useMemo(() => {
    const m = {};
    akun.forEach((a) => { if (a.jamaahId) m[String(a.jamaahId)] = a; });
    return m;
  }, [akun]);

  const hubungkanJamaah = (a, jamaahId) => {
    if (jamaahId && terpakai[jamaahId] && terpakai[jamaahId].id !== a.id) {
      alert(`Data jamaah itu sudah terhubung ke akun ${terpakai[jamaahId].email}.`);
      return;
    }
    setAkun((l) => l.map((x) => (x.id === a.id
      ? { ...x, jamaahId: jamaahId || null, periodeId: jamaahId ? pid : null }
      : x)));
    setPesan({ ok: true, teks: jamaahId
      ? `Akun ${a.email} dihubungkan ke data jamaah.`
      : `Tautan data jamaah pada ${a.email} dilepas.` });
  };

  const ubahPeran = (a, peran) => {
    if (a.id === pengguna.uid && peran === "Jamaah") {
      alert("Anda tidak bisa menurunkan peran akun Anda sendiri.");
      return;
    }
    setAkun((l) => l.map((x) => (x.id === a.id ? { ...x, peran } : x)));
  };

  const kirimReset = async (a) => {
    if (!window.confirm(`Kirim tautan atur ulang kata sandi ke ${a.email}?`)) return;
    try {
      await lupaSandi(a.email);
      setPesan({ ok: true, teks: `Tautan atur ulang kata sandi sudah dikirim ke ${a.email}.` });
    } catch (e) {
      setPesan({ ok: false, teks: "Gagal mengirim: " + pesanGalat(e) });
    }
  };

  const hapusDariDaftar = (a) => {
    if (a.id === pengguna.uid) { alert("Anda tidak bisa menghapus akun Anda sendiri."); return; }
    if (!window.confirm(
      `Hapus ${a.email} dari daftar?\n\nAkun akan kehilangan seluruh akses. Namun kredensial login-nya masih tersimpan di Firebase — untuk menghapus tuntas, buka Firebase Console → Authentication → Users.`
    )) return;
    setAkun((l) => l.filter((x) => x.id !== a.id));
    setPesan({ ok: true, teks: `${a.email} dihapus dari daftar. Aksesnya sudah dicabut.` });
  };

  return (
    <div className="fade">
      <div style={{ marginBottom: 16 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Pengaturan Akun</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Kelola siapa saja yang boleh membuka aplikasi ini.</p>
      </div>

      {/* Akun saya */}
      <div style={{ background: `linear-gradient(120deg, ${C.greenDeep}, ${C.green})`, borderRadius: 18, padding: 18, marginBottom: 18, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13, flexWrap: "wrap" }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "#ffffff22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <UserCog size={23} />
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: 11, color: "#b9cdc0", letterSpacing: ".05em", textTransform: "uppercase", fontWeight: 700 }}>Akun Anda</div>
            <div style={{ fontSize: 15.5, fontWeight: 700, marginTop: 2, wordBreak: "break-all" }}>{pengguna.email}</div>
            <div style={{ display: "flex", gap: 7, marginTop: 7, flexWrap: "wrap" }}>
              <Badge bg="#ffffff26" color="#fff" icon={ShieldCheck}>{akunSaya?.peran || "Pembimbing"}</Badge>
              {!sayaTerdaftar && <Badge bg="#ffffff26" color={C.goldSoft}>Belum tercatat di daftar</Badge>}
            </div>
          </div>
          <button className="btn" onClick={() => kirimReset({ email: pengguna.email })}
            style={{ background: "#ffffff22", color: "#fff", padding: "9px 14px", borderRadius: 11, fontSize: 12.5 }}>
            <KeyRound size={15} /> Ubah Kata Sandi
          </button>
        </div>
        {!sayaTerdaftar && (
          <div style={{ marginTop: 14, paddingTop: 13, borderTop: "1px solid #ffffff22", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12.5, color: "#d7e4da", flex: 1, minWidth: 200 }}>
              Akun Anda dibuat sebelum fitur ini ada, jadi belum tercatat. Catatkan agar muncul di daftar.
            </span>
            <button className="btn" onClick={daftarkanDiri}
              style={{ background: C.gold, color: "#3a2c05", padding: "8px 14px", borderRadius: 10, fontSize: 12.5 }}>
              <Plus size={15} /> Catatkan Akun Saya
            </button>
          </div>
        )}
      </div>

      {pesan && (
        <div style={{
          background: pesan.ok ? C.greenSoft : C.dangerSoft, color: pesan.ok ? C.green : C.danger,
          borderRadius: 12, padding: "11px 14px", marginBottom: 16, fontSize: 12.5,
          display: "flex", gap: 8, alignItems: "flex-start",
        }}>
          {pesan.ok ? <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: 1 }} /> : <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />}
          <span style={{ flex: 1 }}>{pesan.teks}</span>
          <button className="btn iconbtn" onClick={() => setPesan(null)} style={{ background: "transparent", padding: 2 }}><X size={14} /></button>
        </div>
      )}

      {/* Daftar akun */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>
          <Users size={16} /> Akun Terdaftar ({akun.length})
          <span style={{ fontWeight: 600, textTransform: "none", letterSpacing: 0, color: C.muted, fontSize: 12 }}>
            · {akunPembimbing.length} pembimbing, {akunJamaah.length} jamaah
          </span>
        </span>
        <button className="btn" onClick={() => setBuat(true)} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}>
          <UserPlus size={17} /> Tambah Akun
        </button>
      </div>

      {!siapAkun ? (
        <div style={{ textAlign: "center", padding: 40, color: C.muted, fontSize: 13 }}>
          <Loader2 size={20} className="spin" color={C.green} /><div style={{ marginTop: 8 }}>Memuat daftar akun…</div>
        </div>
      ) : akun.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "44px 20px", textAlign: "center", color: C.muted }}>
          <UserCog size={32} color={C.border} />
          <p style={{ marginTop: 12, fontWeight: 600 }}>Belum ada akun tercatat.</p>
          <p style={{ margin: "4px 0 0", fontSize: 13 }}>Tekan "Tambah Akun" untuk membuatkan akun pembimbing atau jamaah.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            { judul: "Pembimbing", isi: akunPembimbing, ikon: ShieldCheck, warna: C.green },
            { judul: "Jamaah", isi: akunJamaah, ikon: User, warna: "#2f7fa8" },
          ].map((grup) => (
            <div key={grup.judul}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 11, paddingBottom: 8, borderBottom: `2px solid ${grup.warna}22` }}>
                <grup.ikon size={16} color={grup.warna} />
                <span style={{ fontSize: 13, fontWeight: 800, color: grup.warna, textTransform: "uppercase", letterSpacing: ".04em" }}>{grup.judul}</span>
                <span style={{ background: grup.warna + "18", color: grup.warna, padding: "2px 9px", borderRadius: 99, fontSize: 11.5, fontWeight: 800 }}>{grup.isi.length}</span>
              </div>
              {grup.isi.length === 0 ? (
                <div style={{ fontSize: 12.5, color: C.muted, padding: "6px 0 4px", fontStyle: "italic" }}>
                  Belum ada akun {grup.judul.toLowerCase()}.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {grup.isi.map((a) => {
            const P = PERAN[a.peran] || PERAN.Pembimbing;
            const sayaSendiri = a.id === pengguna.uid;
            return (
              <div key={a.id} style={{
                background: C.surface, border: `1px solid ${a.aktif ? C.border : C.danger + "44"}`,
                borderRadius: 16, padding: 15, opacity: a.aktif ? 1 : .75,
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                    background: a.aktif ? P.latar : C.dangerSoft, color: a.aktif ? P.warna : C.danger,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {a.aktif ? <P.ikon size={20} /> : <ShieldOff size={20} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                      {a.nama || "(tanpa nama)"}
                      {sayaSendiri && <Badge bg={C.greenSoft} color={C.green}>Anda</Badge>}
                      {!a.aktif && <Badge bg={C.dangerSoft} color={C.danger} icon={CircleSlash}>Nonaktif</Badge>}
                    </div>
                    <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3, display: "flex", alignItems: "center", gap: 5, wordBreak: "break-all" }}>
                      <Mail size={12} /> {a.email}
                    </div>
                    <div style={{ fontSize: 11.5, color: C.muted, marginTop: 4 }}>
                      {P.ket}{a.dibuat ? ` · dibuat ${tglRingkas(a.dibuat.slice(0, 10))}` : ""}
                    </div>
                  </div>
                  <select className="field" value={a.peran || "Pembimbing"} onChange={(e) => ubahPeran(a, e.target.value)}
                    disabled={sayaSendiri}
                    style={{ ...inputStyle, width: "auto", padding: "7px 10px", fontSize: 12.5, opacity: sayaSendiri ? .6 : 1 }}>
                    <option>Pembimbing</option>
                    <option>Jamaah</option>
                  </select>
                </div>

                {a.peran === "Jamaah" && (
                  <div style={{ marginTop: 12, background: C.bg, borderRadius: 11, padding: "11px 13px" }}>
                    <div style={{ fontSize: 11.5, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 7, display: "flex", alignItems: "center", gap: 6 }}>
                      <ContactRound size={13} /> Terhubung ke data jamaah
                    </div>
                    <select className="field" value={a.jamaahId ? String(a.jamaahId) : ""}
                      onChange={(e) => hubungkanJamaah(a, e.target.value)}
                      style={{ ...inputStyle, fontSize: 13 }}>
                      <option value="">— belum dihubungkan —</option>
                      {list.map((j) => {
                        const dipakaiOrangLain = terpakai[String(j.id)] && terpakai[String(j.id)].id !== a.id;
                        return (
                          <option key={j.id} value={String(j.id)} disabled={dipakaiOrangLain}>
                            {j.nama}{j.rombongan ? ` — Rmb ${j.rombongan}` : ""}{dipakaiOrangLain ? " (sudah dipakai)" : ""}
                          </option>
                        );
                      })}
                    </select>
                    {a.jamaahId && a.periodeId && String(a.periodeId) !== String(pid) && (
                      <div style={{ fontSize: 11.5, color: C.goldDeep, marginTop: 6, display: "flex", gap: 5 }}>
                        <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                        Terhubung ke periode lain — pilih ulang bila ingin memindahkannya ke periode ini.
                      </div>
                    )}
                    {!a.jamaahId && (
                      <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>
                        Selama belum dihubungkan, jamaah tidak bisa membuka Kartu Saya.
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", gap: 7, marginTop: 13, paddingTop: 12, borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
                  <button className="btn" onClick={() => kirimReset(a)}
                    style={{ background: C.goldSoft, color: C.goldDeep, padding: "7px 12px", borderRadius: 9, fontSize: 12.5 }}>
                    <KeyRound size={14} /> Reset Kata Sandi
                  </button>
                  <button className="btn" onClick={() => ubahAktif(a)} disabled={sayaSendiri}
                    style={{
                      background: a.aktif ? C.bg : C.greenSoft, color: sayaSendiri ? C.border : (a.aktif ? C.muted : C.green),
                      border: `1px solid ${C.border}`, padding: "7px 12px", borderRadius: 9, fontSize: 12.5,
                      cursor: sayaSendiri ? "not-allowed" : "pointer",
                    }}>
                    {a.aktif ? <><ShieldOff size={14} /> Nonaktifkan</> : <><ShieldCheck size={14} /> Aktifkan</>}
                  </button>
                  <button className="btn" onClick={() => hapusDariDaftar(a)} disabled={sayaSendiri}
                    style={{
                      marginLeft: "auto", background: C.dangerSoft, color: sayaSendiri ? C.border : C.danger,
                      padding: "7px 12px", borderRadius: 9, fontSize: 12.5,
                      cursor: sayaSendiri ? "not-allowed" : "pointer",
                    }}>
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Keterangan penting */}
      <div style={{ background: C.bg, borderRadius: 14, padding: "14px 16px", marginTop: 18, fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>
        <div style={{ fontWeight: 800, color: C.ink, marginBottom: 7, display: "flex", alignItems: "center", gap: 7 }}>
          <ShieldCheck size={15} color={C.green} /> Tentang penghapusan akun
        </div>
        Firebase tidak mengizinkan aplikasi web menghapus akun orang lain — itu hanya bisa lewat Firebase Console.
        Karena itu tombol <strong>Hapus</strong> dan <strong>Nonaktifkan</strong> di sini <strong>mencabut seluruh akses</strong>:
        orang tersebut masih bisa memasukkan kata sandinya, tetapi tidak akan bisa membuka data apa pun.
        <br /><br />
        Untuk menghapus kredensialnya sampai tuntas, buka <strong>Firebase Console → Authentication → Users</strong>,
        cari emailnya, lalu hapus dari sana.
      </div>

      {buat && (
        <BuatAkunModal
          onClose={() => setBuat(false)}
          sudahAda={akun.map((a) => (a.email || "").toLowerCase())}
          list={list} pid={pid} terpakai={terpakai} periodeAktif={periodeAktif}
          onBerhasil={(data) => {
            setAkun((l) => [...l, { ...data, dibuatOleh: pengguna.email }]);
            setBuat(false);
            setPesan({ ok: true, teks: `Akun ${data.email} berhasil dibuat sebagai ${data.peran}.` });
          }} />
      )}
    </div>
  );
}

function BuatAkunModal({ onClose, onBerhasil, sudahAda, list = [], pid, terpakai = {}, periodeAktif }) {
  const [f, setF] = useState({ nama: "", email: "", sandi: "", peran: "Jamaah", jamaahId: "" });
  const [sibuk, setSibuk] = useState(false);
  const [galat, setGalat] = useState("");
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const acakSandi = () => {
    const huruf = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let hasil = "";
    for (let i = 0; i < 10; i++) hasil += huruf[Math.floor(Math.random() * huruf.length)];
    set("sandi", hasil);
  };

  const kirim = async () => {
    setGalat("");
    if (!f.email.trim()) return setGalat("Email belum diisi.");
    if (sudahAda.includes(f.email.trim().toLowerCase())) return setGalat("Email itu sudah ada di daftar akun.");
    if (f.sandi.length < 6) return setGalat("Kata sandi minimal 6 karakter.");
    if (f.peran === "Jamaah" && f.jamaahId && terpakai[f.jamaahId]) {
      return setGalat("Data jamaah itu sudah terhubung ke akun lain.");
    }
    setSibuk(true);
    try {
      const { uid, email } = await buatAkunBaru(f.email, f.sandi);
      onBerhasil({
        id: uid, email, nama: f.nama.trim() || email.split("@")[0],
        peran: f.peran, aktif: true, dibuat: new Date().toISOString(),
        jamaahId: f.peran === "Jamaah" && f.jamaahId ? f.jamaahId : null,
        periodeId: f.peran === "Jamaah" && f.jamaahId ? pid : null,
      });
    } catch (e) {
      setGalat(pesanGalat(e));
    }
    setSibuk(false);
  };

  const P = PERAN[f.peran];

  return (
    <Modal onClose={sibuk ? () => {} : onClose} width={430}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <UserPlus size={18} color={C.green} /> Tambah Akun
          </h3>
          <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>
        <p style={{ margin: "0 0 16px", fontSize: 12.5, color: C.muted }}>
          Akun dibuat langsung tanpa membuat Anda keluar dari aplikasi.
        </p>

        <Label>Peran</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 6 }}>
          {Object.entries(PERAN).map(([k, v]) => {
            const on = f.peran === k;
            return (
              <button key={k} className="btn" onClick={() => set("peran", k)}
                style={{
                  justifyContent: "flex-start", padding: "10px 12px", borderRadius: 11, fontSize: 13,
                  background: on ? v.latar : "#fff", color: on ? v.warna : C.muted,
                  border: `1.5px solid ${on ? v.warna : C.border}`,
                }}>
                <v.ikon size={16} /> {k}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 14 }}>{P.ket}.</div>

        {f.peran === "Jamaah" && (
          <>
            <Label>Hubungkan ke data jamaah</Label>
            <select className="field" style={{ ...inputStyle, marginBottom: 6 }} value={f.jamaahId}
              onChange={(e) => {
                const id = e.target.value;
                const j = list.find((x) => String(x.id) === id);
                setF((s) => ({ ...s, jamaahId: id, nama: s.nama || (j?.nama || "") }));
              }}>
              <option value="">— pilih nanti —</option>
              {list.map((j) => {
                const dipakai = !!terpakai[String(j.id)];
                return (
                  <option key={j.id} value={String(j.id)} disabled={dipakai}>
                    {j.nama}{j.rombongan ? ` — Rmb ${j.rombongan}` : ""}{dipakai ? " (sudah dipakai)" : ""}
                  </option>
                );
              })}
            </select>
            <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 14 }}>
              Satu akun hanya untuk satu jamaah{periodeAktif ? `, pada periode ${periodeAktif.nama}` : ""}.
            </div>
          </>
        )}

        <Label>Nama</Label>
        <input className="field" style={{ ...inputStyle, marginBottom: 12 }} value={f.nama}
          onChange={(e) => set("nama", e.target.value)} placeholder="cth. Ustadz Fulan" />

        <Label req>Email</Label>
        <input className="field" type="email" style={{ ...inputStyle, marginBottom: 12 }} value={f.email}
          onChange={(e) => set("email", e.target.value)} placeholder="nama@email.com" autoComplete="off" />

        <Label req>Kata sandi sementara</Label>
        <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <input className="field" style={{ ...inputStyle, flex: 1 }} value={f.sandi}
            onChange={(e) => set("sandi", e.target.value)} placeholder="minimal 6 karakter" autoComplete="off" />
          <button className="btn" onClick={acakSandi}
            style={{ background: C.greenSoft, color: C.green, padding: "0 14px", borderRadius: 11, fontSize: 12.5 }}>Acak</button>
        </div>
        <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 14 }}>
          Berikan kata sandi ini ke yang bersangkutan, lalu minta menggantinya lewat "Lupa kata sandi".
        </div>

        {galat && (
          <div style={{ background: C.dangerSoft, color: C.danger, borderRadius: 10, padding: "10px 12px", fontSize: 12.5, marginBottom: 14, display: "flex", gap: 7 }}>
            <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} /> {galat}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button className="btn" onClick={onClose} disabled={sibuk}
            style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "10px 18px", borderRadius: 11 }}>Batal</button>
          <button className="btn" onClick={kirim} disabled={sibuk}
            style={{ background: sibuk ? C.border : C.green, color: "#fff", padding: "10px 20px", borderRadius: 11 }}>
            {sibuk ? <Loader2 size={16} className="spin" /> : <Check size={16} />} {sibuk ? "Membuat…" : "Buat Akun"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ============================================================
   KARTU SAYA — halaman pribadi untuk akun jamaah
   ============================================================ */
function KartuSayaPage({ saya, simpan, siap, akunSaya, pengguna, tg, pid, periodeAktif, hotel, onDarurat }) {
  const [mode, setMode] = useState("kartu");   // kartu | profil
  const [tulis, setTulis] = useState(false);
  const [ubahCat, setUbahCat] = useState(null);
  const [kirim, setKirim] = useState(null);    // {ok, teks}

  if (!akunSaya?.jamaahId) {
    return (
      <div className="fade" style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 18, padding: "44px 22px", textAlign: "center" }}>
        <ContactRound size={34} color={C.border} />
        <p style={{ margin: "14px 0 4px", fontWeight: 700, fontSize: 15.5 }}>Akun belum terhubung ke data jamaah</p>
        <p style={{ margin: "0 auto", fontSize: 13, color: C.muted, maxWidth: 380, lineHeight: 1.6 }}>
          Mintalah pembimbing menghubungkan akun <strong>{pengguna.email}</strong> ke data jamaah Anda
          lewat halaman Pengaturan Akun.
        </p>
      </div>
    );
  }

  if (!siap) {
    return <div style={{ textAlign: "center", padding: 50, color: C.muted, fontSize: 13 }}>
      <Loader2 size={20} className="spin" color={C.green} /><div style={{ marginTop: 8 }}>Memuat data Anda…</div>
    </div>;
  }

  if (!saya) {
    return (
      <div className="fade" style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 18, padding: "44px 22px", textAlign: "center" }}>
        <AlertTriangle size={30} color={C.gold} />
        <p style={{ margin: "14px 0 4px", fontWeight: 700 }}>Data jamaah tidak ditemukan</p>
        <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Data mungkin sudah dipindahkan. Hubungi pembimbing Anda.</p>
      </div>
    );
  }

  const catatan = [...(saya.catatanHarian || [])].sort((a, b) => (b.waktuISO || "").localeCompare(a.waktuISO || ""));
  const terakhir = catatan[0];

  // Mencari kamar hotel yang memuat jamaah ini pada kota tertentu
  const kamarSaya = (kota) => {
    const semua = hotel?.kamar || [];
    const k = semua.find((x) => (x.kota || "Makkah") === kota &&
      (x.penghuni || []).some((id) => String(id) === String(saya.id)));
    if (!k) return "";
    return [k.namaHotel, `Kamar ${k.nomor}`].filter(Boolean).join(" · ");
  };

  // Menyimpan catatan + mengirim ke Telegram + mencatat ke riwayat
  const simpanCatatan = async (c) => {
    const lama = saya.catatanHarian || [];
    const baru = c.id ? lama.map((x) => (x.id === c.id ? c : x)) : [...lama, { ...c, id: Date.now() }];
    await simpan({ catatanHarian: baru });
    setTulis(false); setUbahCat(null);

    if (c.id) return;   // hanya catatan baru yang dikirim

    const K = KONDISI[c.kondisi] || KONDISI.sehat;
    const pesan = [
      `📋 <b>CATATAN JAMAAH</b>`,
      "━━━━━━━━━━━━━━",
      periodeAktif ? `Periode: ${escHtml(periodeAktif.nama)}` : "",
      `Jamaah: <b>${escHtml(saya.nama || "-")}</b>${saya.rombongan ? ` (Rmb ${escHtml(saya.rombongan)})` : ""}`,
      `Kondisi: <b>${escHtml(K.label)}</b>`,
      "",
      c.isi ? escHtml(c.isi) : "",
      "",
      `🕐 ${waktuLapWIB(c.waktuISO)} WIB · ${waktuLapAST(c.waktuISO)} AST`,
      `<i>Dikirim sendiri oleh jamaah lewat aplikasi.</i>`,
    ].filter(Boolean).join("\n");

    const hasil = [];
    if (tg?.token && tg?.chatId) {
      try { await kirimTelegram(tg.token, tg.chatId, pesan); hasil.push("terkirim ke Telegram pembimbing"); }
      catch (e) { hasil.push("gagal kirim Telegram: " + (e.message || "")); }
    } else {
      hasil.push("Telegram belum diatur pembimbing");
    }

    try {
      await tambahDokumen(["periode", pid, "laporan"], {
        id: Date.now(),
        jenis: "Kondisi Jamaah",
        judul: `Catatan mandiri — ${saya.nama || "Jamaah"}`,
        isi: [
          `Kondisi: ${K.label}`,
          c.isi || "",
        ].filter(Boolean).join("\n"),
        pencatat: `${saya.nama || "Jamaah"} (mandiri)`,
        waktuISO: c.waktuISO,
        status: tg?.token && tg?.chatId ? "terkirim" : "lokal",
      });
      hasil.push("tercatat di riwayat pembimbing");
    } catch (e) {
      hasil.push("gagal mencatat di riwayat");
    }

    setKirim({ ok: !hasil.some((h) => h.startsWith("gagal")), teks: "Catatan tersimpan — " + hasil.join(", ") + "." });
  };

  if (mode === "profil") {
    return (
      <JamaahForm
        initial={saya}
        list={[]}
        onCancel={() => setMode("kartu")}
        onSave={async (data) => {
          // Catatan harian tidak ikut disunting dari form profil
          const { catatanHarian, ...sisanya } = data;
          await simpan({ ...sisanya, catatanHarian: saya.catatanHarian || [] });
          setMode("kartu");
        }} />
    );
  }

  const K = terakhir && KONDISI[terakhir.kondisi] ? KONDISI[terakhir.kondisi] : null;

  return (
    <div className="fade">
      {/* Kartu identitas */}
      <div style={{ background: `linear-gradient(125deg, ${C.greenDeep}, ${C.green})`, borderRadius: 20, padding: 20, color: "#fff", marginBottom: 16, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -26, top: -26, width: 120, height: 120, borderRadius: "50%", background: "#ffffff10" }} />
        <div style={{ display: "flex", gap: 15, alignItems: "center", position: "relative", flexWrap: "wrap" }}>
          <Avatar foto={saya.foto} nama={saya.nama} size={82} />
          <div style={{ flex: 1, minWidth: 170 }}>
            <div style={{ fontSize: 11, color: "#b9cdc0", letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 700 }}>Kartu Jamaah</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 700, marginTop: 3, lineHeight: 1.2 }}>{saya.nama || "—"}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
              {saya.rombongan && <Badge bg="#ffffff26" color="#fff" icon={Users}>Rombongan {saya.rombongan}</Badge>}
              {saya.usia && <Badge bg="#ffffff26" color="#fff">{saya.usia} tahun</Badge>}
              {periodeAktif && <Badge bg="#ffffff26" color={C.goldSoft} icon={Moon}>{periodeAktif.nama}</Badge>}
            </div>
          </div>
          <button className="btn" onClick={() => setMode("profil")}
            style={{ background: "#ffffff22", color: "#fff", padding: "10px 16px", borderRadius: 11, fontSize: 13 }}>
            <Pencil size={15} /> Ubah Profil
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginTop: 16, paddingTop: 15, borderTop: "1px solid #ffffff22" }}>
          <KartuInfo label="Tempat, tanggal lahir" isi={
            [saya.tempatLahir, saya.tanggalLahir ? tglRingkas(saya.tanggalLahir) : ""].filter(Boolean).join(", ")
          } />
          <KartuInfo label="Jenis kelamin" isi={saya.jenisKelamin} />
          <KartuInfo label="Hotel di Madinah" isi={kamarSaya("Madinah")} />
          <KartuInfo label="Hotel di Makkah" isi={kamarSaya("Makkah")} />
        </div>
      </div>

      {/* Tombol darurat — sengaja ditaruh di halaman depan agar cepat dijangkau */}
      <button onClick={onDarurat}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 14, marginBottom: 16,
          background: `linear-gradient(100deg, ${C.danger}, #8c2f2f)`, color: "#fff",
          border: "none", borderRadius: 18, padding: "16px 18px", cursor: "pointer",
          fontFamily: "inherit", textAlign: "left",
          boxShadow: "0 8px 22px rgba(178,59,59,.32)",
        }}>
        <span style={{
          width: 50, height: 50, borderRadius: "50%", background: "#ffffff26", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Siren size={26} />
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 16.5, fontWeight: 800, letterSpacing: ".01em" }}>TOMBOL DARURAT</span>
          <span style={{ display: "block", fontSize: 12, opacity: .92, marginTop: 2, lineHeight: 1.45 }}>
            Kirim lokasi Anda ke pembimbing & hubungi lewat WhatsApp
          </span>
        </span>
        <ChevronRight size={22} style={{ flexShrink: 0, opacity: .8 }} />
      </button>

      {kirim && (
        <div style={{
          background: kirim.ok ? C.greenSoft : C.goldSoft, color: kirim.ok ? C.green : C.goldDeep,
          borderRadius: 12, padding: "11px 14px", marginBottom: 14, fontSize: 12.5, display: "flex", gap: 8, alignItems: "flex-start",
        }}>
          {kirim.ok ? <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: 1 }} /> : <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />}
          <span style={{ flex: 1 }}>{kirim.teks}</span>
          <button className="btn iconbtn" onClick={() => setKirim(null)} style={{ background: "transparent", padding: 2 }}><X size={14} /></button>
        </div>
      )}

      {/* Kondisi terakhir */}
      {K && (
        <div style={{ background: K.latar, borderRadius: 15, padding: "14px 16px", marginBottom: 16, display: "flex", gap: 12, alignItems: "center", borderLeft: `4px solid ${K.warna}` }}>
          <K.ikon size={22} color={K.warna} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: K.warna }}>Kondisi terakhir: {K.label}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
              {terakhir.tanggal ? tglRingkas(terakhir.tanggal) : "—"} · WIB {jamWIB(terakhir.waktuISO)} · AST {jamAST(terakhir.waktuISO)}
            </div>
          </div>
        </div>
      )}

      {/* Catatan harian */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <NotebookPen size={18} color={C.green} /> Catatan & Kondisi Saya
            </h3>
            <p style={{ margin: "3px 0 0", fontSize: 12.5, color: C.muted }}>
              Setiap catatan baru langsung diteruskan ke pembimbing.
            </p>
          </div>
          <button className="btn" onClick={() => { setUbahCat(null); setTulis(true); }}
            style={{ background: C.green, color: "#fff", padding: "9px 15px", borderRadius: 11, fontSize: 13 }}>
            <Plus size={16} /> Tambah Catatan
          </button>
        </div>

        <RiwayatCatatan j={saya}
          onUbah={(c) => { setUbahCat(c); setTulis(true); }}
          onHapus={async (id) => {
            if (!window.confirm("Hapus catatan ini?")) return;
            await simpan({ catatanHarian: (saya.catatanHarian || []).filter((c) => c.id !== id) });
          }} />
      </div>

      <div style={{ background: C.bg, borderRadius: 13, padding: "13px 15px", marginTop: 16, fontSize: 12.5, color: C.muted, lineHeight: 1.6, display: "flex", gap: 9 }}>
        <Send size={15} color={C.green} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>
          Catatan yang Anda kirim akan muncul di grup Telegram pembimbing dan tersimpan di riwayat laporan.
          Bila keadaan mendesak, tekan <strong style={{ color: C.danger }}>Tombol Darurat</strong> di bagian atas halaman ini.
        </span>
      </div>

      {tulis && (
        <CatatanHarianModal
          awal={ubahCat}
          namaPencatat={saya.nama || ""}
          onClose={() => { setTulis(false); setUbahCat(null); }}
          onSimpan={simpanCatatan} />
      )}
    </div>
  );
}

function KartuInfo({ label, isi }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: "#b9cdc0", letterSpacing: ".05em", textTransform: "uppercase", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 3, wordBreak: "break-word" }}>{isi || "—"}</div>
    </div>
  );
}

/* ============================================================
   HOTEL — pembagian kamar
   ============================================================ */
function HotelPage({ list, kamar, setKamar, byId, bolehKelola = true }) {
  const [form, setForm] = useState(null);      // null | {} | kamar
  const [isiKamar, setIsiKamar] = useState(null);
  const [saring, setSaring] = useState("Semua");

  const terisi = useMemo(() => {
    const m = {};
    kamar.forEach((k) => (k.penghuni || []).forEach((id) => { m[String(id)] = k; }));
    return m;
  }, [kamar]);

  const belumDapat = list.filter((j) => !terisi[String(j.id)]);

  const simpanKamar = (k) => {
    if (k.id) setKamar(kamar.map((x) => (x.id === k.id ? k : x)));
    else setKamar([...kamar, { ...k, id: Date.now(), penghuni: [] }]);
    setForm(null);
  };

  const hapusKamar = (k) => {
    const jml = (k.penghuni || []).length;
    if (!window.confirm(jml
      ? `Hapus kamar ${k.nomor}?\n\n${jml} penghuni akan kembali ke daftar "belum dapat kamar".`
      : `Hapus kamar ${k.nomor}?`)) return;
    setKamar(kamar.filter((x) => x.id !== k.id));
  };

  const keluarkan = (kamarId, jamaahId) => {
    setKamar(kamar.map((k) => (k.id === kamarId
      ? { ...k, penghuni: (k.penghuni || []).filter((id) => String(id) !== String(jamaahId)) }
      : k)));
  };

  const masukkan = (kamarId, jamaahId) => {
    setKamar(kamar.map((k) => {
      const bersih = (k.penghuni || []).filter((id) => String(id) !== String(jamaahId));
      return k.id === kamarId ? { ...k, penghuni: [...bersih, String(jamaahId)] } : { ...k, penghuni: bersih };
    }));
  };

  if (form !== null) return <KamarForm initial={form.id ? form : null} onCancel={() => setForm(null)} onSave={simpanKamar} />;

  const totalPenghuni = kamar.reduce((n, k) => n + (k.penghuni || []).length, 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Kamar Hotel</h2>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>
            {kamar.length} kamar · {totalPenghuni} dari {list.length} jamaah sudah dapat kamar.
          </p>
        </div>
        {bolehKelola && (
          <button className="btn" onClick={() => setForm({})} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}>
            <Plus size={18} /> Tambah Kamar
          </button>
        )}
      </div>

      {!bolehKelola && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.bg, color: C.muted, borderRadius: 9, padding: "6px 11px", fontSize: 11.5, marginBottom: 14 }}>
          <Lock size={12} /> Hanya bisa dilihat
        </div>
      )}

      {kamar.length > 0 && (
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
          {["Semua", "Makkah", "Madinah"].map((k) => {
            const on = saring === k;
            const jml = k === "Semua" ? kamar.length : kamar.filter((x) => (x.kota || "Makkah") === k).length;
            return (
              <button key={k} className="btn" onClick={() => setSaring(k)}
                style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.muted, border: `1px solid ${on ? C.green : C.border}`, padding: "6px 13px", borderRadius: 99, fontSize: 12.5 }}>
                {k === "Makkah" ? "Hotel Makkah" : k === "Madinah" ? "Hotel Madinah" : "Semua"} ({jml})
              </button>
            );
          })}
        </div>
      )}

      {kamar.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "46px 20px", textAlign: "center", color: C.muted, marginTop: 14 }}>
          <Hotel size={32} color={C.border} />
          <p style={{ marginTop: 12, fontWeight: 600 }}>Belum ada kamar.</p>
          {bolehKelola && <p style={{ margin: "4px 0 0", fontSize: 13 }}>Tekan "Tambah Kamar" untuk mulai membagi.</p>}
        </div>
      ) : (
        <div className="kartu-grid" style={{ marginTop: 14 }}>
          {kamar.filter((k) => saring === "Semua" || (k.kota || "Makkah") === saring).map((k) => {
            const penghuni = (k.penghuni || []).map((id) => byId(id)).filter(Boolean);
            const kapasitas = Number(k.kapasitas) || 0;
            const penuh = kapasitas > 0 && penghuni.length >= kapasitas;
            return (
              <div key={k.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 17, padding: 16 }}>
                <div style={{ display: "flex", gap: 11, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: penuh ? C.greenSoft : C.bg, color: penuh ? C.green : C.muted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <DoorOpen size={20} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16.5, fontWeight: 800, lineHeight: 1.2 }}>Kamar {k.nomor}</div>
                    {k.namaHotel && <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>{k.namaHotel}</div>}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                      <Badge bg={(k.kota || "Makkah") === "Madinah" ? "#e6f0f5" : C.greenSoft} color={(k.kota || "Makkah") === "Madinah" ? "#2f7fa8" : C.green} icon={Hotel}>
                        {k.kota || "Makkah"}
                      </Badge>
                      {k.lantai && <Badge bg={C.bg} color={C.muted}>Lantai {k.lantai}</Badge>}
                      {k.tipe && <Badge bg={C.goldSoft} color={C.goldDeep} icon={BedDouble}>{k.tipe}</Badge>}
                      <Badge bg={penuh ? C.greenSoft : C.bg} color={penuh ? C.green : C.muted} icon={Users}>
                        {penghuni.length}{kapasitas ? `/${kapasitas}` : ""} orang
                      </Badge>
                    </div>
                  </div>
                  {bolehKelola && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn iconbtn" onClick={() => setForm(k)} title="Ubah" style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Pencil size={14} /></button>
                      <button className="btn iconbtn" onClick={() => hapusKamar(k)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><Trash2 size={14} /></button>
                    </div>
                  )}
                </div>

                {k.catatan && <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 11, lineHeight: 1.5 }}>{k.catatan}</div>}

                {penghuni.length === 0 ? (
                  <div style={{ fontSize: 12.5, color: C.border, padding: "14px 0", textAlign: "center", border: `1px dashed ${C.border}`, borderRadius: 11 }}>
                    Belum ada penghuni
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {penghuni.map((j) => (
                      <div key={j.id} style={{ display: "flex", alignItems: "center", gap: 9, background: C.bg, borderRadius: 10, padding: "7px 9px" }}>
                        <Avatar foto={j.foto} nama={j.nama} size={30} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.nama}</div>
                          {j.rombongan && <div style={{ fontSize: 11, color: C.muted }}>Rombongan {j.rombongan}</div>}
                        </div>
                        {bolehKelola && (
                          <button className="btn iconbtn" onClick={() => keluarkan(k.id, j.id)} title="Keluarkan dari kamar"
                            style={{ background: "#fff", color: C.muted, padding: 6, borderRadius: 8 }}><X size={13} /></button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {bolehKelola && !penuh && (
                  <button className="btn" onClick={() => setIsiKamar(k)}
                    style={{ width: "100%", justifyContent: "center", marginTop: 10, background: C.greenSoft, color: C.green, padding: "9px 12px", borderRadius: 10, fontSize: 12.5 }}>
                    <UserPlus size={15} /> Masukkan Jamaah
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Belum dapat kamar */}
      {bolehKelola && belumDapat.length > 0 && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, marginTop: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".05em", textTransform: "uppercase", color: C.muted, marginBottom: 11 }}>
            Belum dapat kamar ({belumDapat.length})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {belumDapat.map((j) => (
              <div key={j.id} style={{ display: "flex", alignItems: "center", gap: 7, background: C.bg, borderRadius: 99, padding: "5px 12px 5px 5px", fontSize: 12.5 }}>
                <Avatar foto={j.foto} nama={j.nama} size={24} />
                <span style={{ fontWeight: 600 }}>{j.nama}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isiKamar && (
        <PilihPenghuniModal kamar={isiKamar} list={list} terisi={terisi}
          onClose={() => setIsiKamar(null)}
          onPilih={(jamaahId) => { masukkan(isiKamar.id, jamaahId); setIsiKamar(null); }} />
      )}
    </div>
  );
}

function KamarForm({ initial, onCancel, onSave }) {
  const [f, setF] = useState(initial || { kota: "Makkah", namaHotel: "", nomor: "", lantai: "", tipe: "Double", kapasitas: "2", catatan: "" });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const bisa = String(f.nomor).trim().length > 0;

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 560, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>{initial ? "Ubah Kamar" : "Tambah Kamar"}</h2>
        <Grid>
          <div>
            <Label req>Kota</Label>
            <select className="field" style={inputStyle} value={f.kota || "Makkah"} onChange={(e) => set("kota", e.target.value)}>
              <option>Makkah</option><option>Madinah</option><option>Lainnya</option>
            </select>
          </div>
          <div>
            <Label>Nama hotel</Label>
            <input className="field" style={inputStyle} value={f.namaHotel || ""} onChange={(e) => set("namaHotel", e.target.value)} placeholder="cth. Anjum Makkah" />
          </div>
          <div>
            <Label req>Nomor kamar</Label>
            <input className="field" style={inputStyle} value={f.nomor} onChange={(e) => set("nomor", e.target.value)} placeholder="cth. 812" />
          </div>
          <div>
            <Label>Lantai</Label>
            <input className="field" style={inputStyle} value={f.lantai} onChange={(e) => set("lantai", e.target.value)} placeholder="cth. 8" />
          </div>
          <div>
            <Label>Tipe kamar</Label>
            <select className="field" style={inputStyle} value={f.tipe} onChange={(e) => set("tipe", e.target.value)}>
              <option>Double</option><option>Triple</option><option>Quad</option><option>Single</option>
            </select>
          </div>
          <div>
            <Label>Kapasitas</Label>
            <input className="field" type="number" min="1" style={inputStyle} value={f.kapasitas} onChange={(e) => set("kapasitas", e.target.value)} placeholder="cth. 4" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Catatan</Label>
            <input className="field" style={inputStyle} value={f.catatan} onChange={(e) => set("catatan", e.target.value)} placeholder="cth. dekat lift, kamar lansia" />
          </div>
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!bisa} onClick={() => onSave(f)} style={{ background: bisa ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: bisa ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

function PilihPenghuniModal({ kamar, list, terisi, onClose, onPilih }) {
  const [q, setQ] = useState("");
  const hasil = list.filter((j) => {
    const s = q.trim().toLowerCase();
    return !s || (j.nama || "").toLowerCase().includes(s);
  });

  return (
    <Modal onClose={onClose} width={420}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Masukkan ke Kamar {kamar.nomor}</h3>
          <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>
        <p style={{ margin: "0 0 14px", fontSize: 12.5, color: C.muted }}>
          Jamaah yang sudah punya kamar lain akan otomatis dipindahkan.
        </p>

        <div style={{ position: "relative", marginBottom: 12 }}>
          <Search size={16} color={C.muted} style={{ position: "absolute", left: 12, top: 12 }} />
          <input className="field" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama…" style={{ ...inputStyle, paddingLeft: 38 }} />
        </div>

        <div style={{ maxHeight: 340, overflow: "auto" }} className="kbih-scroll">
          {hasil.length === 0 ? (
            <div style={{ textAlign: "center", padding: 24, fontSize: 13, color: C.muted }}>Tidak ada nama yang cocok.</div>
          ) : hasil.map((j) => {
            const kamarLain = terisi[String(j.id)];
            const disini = kamarLain && kamarLain.id === kamar.id;
            return (
              <button key={j.id} className="btn" onClick={() => !disini && onPilih(j.id)} disabled={disini}
                style={{
                  width: "100%", justifyContent: "flex-start", gap: 10, padding: "9px 10px", marginBottom: 6,
                  background: disini ? C.greenSoft : "#fff", border: `1px solid ${C.border}`, borderRadius: 11,
                  cursor: disini ? "default" : "pointer", textAlign: "left",
                }}>
                <Avatar foto={j.foto} nama={j.nama} size={32} />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 13.5, fontWeight: 700 }}>{j.nama}</span>
                  <span style={{ display: "block", fontSize: 11.5, color: C.muted }}>
                    {disini ? "sudah di kamar ini" : kamarLain ? `sekarang di kamar ${kamarLain.nomor}` : (j.rombongan ? `Rombongan ${j.rombongan}` : "belum dapat kamar")}
                  </span>
                </span>
                {disini ? <Check size={16} color={C.green} /> : <ChevronRight size={16} color={C.border} />}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

/* ============================================================
   IMPOR & TEMPLATE (Doa / Hukum Fiqh)
   Memakai berkas CSV agar bisa disunting di Excel maupun
   Google Sheets tanpa aplikasi tambahan.
   ============================================================ */

// Menebak pemisah kolom: koma atau titik koma (Excel Indonesia sering memakai ';')
function tebakPemisah(barisPertama) {
  const koma = (barisPertama.match(/,/g) || []).length;
  const titikKoma = (barisPertama.match(/;/g) || []).length;
  return titikKoma > koma ? ";" : ",";
}

function uraiCSV(teks) {
  const bersih = teks.replace(/^\uFEFF/, "");
  const pemisah = tebakPemisah(bersih.split(/\r?\n/)[0] || "");
  const baris = [];
  let kolom = [], nilai = "", dalamKutip = false;

  for (let i = 0; i < bersih.length; i++) {
    const c = bersih[i];
    if (dalamKutip) {
      if (c === '"') {
        if (bersih[i + 1] === '"') { nilai += '"'; i++; }
        else dalamKutip = false;
      } else nilai += c;
    } else if (c === '"') dalamKutip = true;
    else if (c === pemisah) { kolom.push(nilai); nilai = ""; }
    else if (c === "\n") { kolom.push(nilai); baris.push(kolom); kolom = []; nilai = ""; }
    else if (c !== "\r") nilai += c;
  }
  if (nilai !== "" || kolom.length) { kolom.push(nilai); baris.push(kolom); }
  return baris.filter((r) => r.some((x) => String(x).trim() !== ""));
}

function keCSV(baris) {
  return baris.map((r) => r.map((sel) => {
    const t = String(sel ?? "");
    return /["',;\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
  }).join(",")).join("\r\n");
}

function unduhCSV(namaBerkas, baris) {
  // Tanda BOM agar tulisan Arab tampil benar saat dibuka di Excel
  const isi = "\uFEFF" + keCSV(baris);
  const blob = new Blob([isi], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = namaBerkas;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const KOLOM_DOA = [
  { kunci: "kategori", label: "Kategori", contoh: "Thawaf" },
  { kunci: "judul", label: "Judul", contoh: "Doa Memulai Thawaf" },
  { kunci: "arab", label: "Teks Arab", contoh: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ" },
  { kunci: "latin", label: "Bacaan Latin", contoh: "Bismillahi wallahu akbar" },
  { kunci: "arti", label: "Arti", contoh: "Dengan nama Allah, Allah Maha Besar." },
  { kunci: "catatan", label: "Catatan", contoh: "Dibaca saat memulai putaran pertama." },
];

const KOLOM_FIQH = [
  { kunci: "kategori", label: "Kategori", contoh: "Rukun & Wajib" },
  { kunci: "judul", label: "Judul", contoh: "Rukun Umroh" },
  { kunci: "isi", label: "Uraian Hukum", contoh: "Rukun umroh ada empat: ihram, thawaf, sa'i, dan tahallul." },
  { kunci: "dalil", label: "Dalil", contoh: "Disepakati mayoritas ulama." },
  { kunci: "rujukan", label: "Rujukan Kitab", contoh: "Fikih Manasik — mazhab Syafi'i" },
  { kunci: "catatan", label: "Catatan", contoh: "Tekankan saat manasik." },
];

function ImporModal({ judul, namaBerkas, kolom, items, setItems, kategori, setKategori, onClose }) {
  const [tahap, setTahap] = useState("pilih");   // pilih | pratinjau | selesai
  const [data, setData] = useState([]);
  const [galat, setGalat] = useState("");
  const [namaFile, setNamaFile] = useState("");
  const [katBaru, setKatBaru] = useState([]);
  const ref = useRef(null);

  const unduhTemplate = () => {
    const baris = [
      kolom.map((k) => k.label),
      kolom.map((k) => k.contoh),
      kolom.map(() => ""),
    ];
    unduhCSV(`template-${namaBerkas}.csv`, baris);
  };

  const unduhDataSekarang = () => {
    const baris = [kolom.map((k) => k.label), ...items.map((it) => kolom.map((k) => it[k.kunci] || ""))];
    unduhCSV(`${namaBerkas}-${new Date().toISOString().slice(0, 10)}.csv`, baris);
  };

  const bacaBerkasCSV = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalat(""); setNamaFile(file.name);
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const baris = uraiCSV(String(rd.result));
        if (baris.length < 2) throw new Error("Berkas kosong atau hanya berisi baris judul.");

        // Cocokkan judul kolom dengan template (tidak peduli huruf besar/kecil)
        const kepala = baris[0].map((x) => String(x).trim().toLowerCase());
        const petaKolom = kolom.map((k) => {
          const i = kepala.indexOf(k.label.toLowerCase());
          return i >= 0 ? i : kepala.indexOf(k.kunci.toLowerCase());
        });
        if (petaKolom[1] < 0) throw new Error(`Kolom "${kolom[1].label}" tidak ditemukan. Gunakan berkas template.`);

        const hasil = [];
        baris.slice(1).forEach((r, i) => {
          const obj = {};
          kolom.forEach((k, ki) => { obj[k.kunci] = petaKolom[ki] >= 0 ? String(r[petaKolom[ki]] ?? "").trim() : ""; });
          if (!obj[kolom[1].kunci]) return;             // judul wajib ada
          hasil.push({ ...obj, id: Date.now() + i, berkas: null });
        });
        if (!hasil.length) throw new Error(`Tidak ada baris berisi ${kolom[1].label.toLowerCase()}.`);

        const adaKat = new Set(kategori.map((k) => k.toLowerCase()));
        const tambahan = [...new Set(hasil.map((h) => h.kategori).filter((k) => k && !adaKat.has(k.toLowerCase())))];

        setData(hasil); setKatBaru(tambahan); setTahap("pratinjau");
      } catch (err) {
        setGalat(err.message || "Berkas tidak dapat dibaca.");
      }
    };
    rd.onerror = () => setGalat("Gagal membaca berkas.");
    rd.readAsText(file, "utf-8");
    e.target.value = "";
  };

  const jalankanImpor = () => {
    if (katBaru.length) setKategori([...kategori, ...katBaru]);
    setItems(data);
    setTahap("selesai");
  };

  return (
    <Modal onClose={onClose} width={520}>
      <div style={{ padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <FileSpreadsheet size={18} color={C.green} /> Impor {judul}
          </h3>
          <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>

        {tahap === "pilih" && (
          <>
            <p style={{ margin: "0 0 16px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
              Unduh template, isi lewat Excel atau Google Sheets, lalu unggah kembali ke sini.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18 }}>
              <button className="btn" onClick={unduhTemplate}
                style={{ justifyContent: "flex-start", gap: 11, background: C.greenSoft, color: C.green, padding: "13px 15px", borderRadius: 12, textAlign: "left" }}>
                <FileDown size={19} style={{ flexShrink: 0 }} />
                <span>
                  <span style={{ display: "block", fontSize: 13.5, fontWeight: 800 }}>Unduh Template Kosong</span>
                  <span style={{ display: "block", fontSize: 11.5, fontWeight: 500, opacity: .85 }}>Berisi judul kolom & satu baris contoh</span>
                </span>
              </button>

              <button className="btn" onClick={unduhDataSekarang} disabled={!items.length}
                style={{ justifyContent: "flex-start", gap: 11, background: items.length ? C.bg : "#fff", color: items.length ? C.ink : C.border, border: `1px solid ${C.border}`, padding: "13px 15px", borderRadius: 12, textAlign: "left" }}>
                <DownloadIcon size={19} style={{ flexShrink: 0 }} />
                <span>
                  <span style={{ display: "block", fontSize: 13.5, fontWeight: 800 }}>Unduh Data Saat Ini</span>
                  <span style={{ display: "block", fontSize: 11.5, fontWeight: 500, opacity: .85 }}>
                    {items.length ? `${items.length} data — berguna sebagai cadangan sebelum mengganti` : "Belum ada data"}
                  </span>
                </span>
              </button>
            </div>

            <div style={{ height: 1, background: C.border, margin: "0 0 16px" }} />

            <input ref={ref} type="file" accept=".csv,text/csv" onChange={bacaBerkasCSV} style={{ display: "none" }} />
            <button className="btn" onClick={() => ref.current?.click()}
              style={{ width: "100%", justifyContent: "center", gap: 9, background: C.green, color: "#fff", padding: "14px", borderRadius: 12, fontSize: 14 }}>
              <Upload size={18} /> Pilih Berkas CSV
            </button>

            {galat && (
              <div style={{ background: C.dangerSoft, color: C.danger, borderRadius: 10, padding: "10px 12px", fontSize: 12.5, marginTop: 12, display: "flex", gap: 7 }}>
                <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} /> {galat}
              </div>
            )}

            <div style={{ background: C.goldSoft, color: C.goldDeep, borderRadius: 11, padding: "11px 13px", fontSize: 12, marginTop: 14, lineHeight: 1.6, display: "flex", gap: 8 }}>
              <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>Impor akan <strong>mengganti seluruh {judul.toLowerCase()} yang ada</strong> dengan isi berkas. Unduh data saat ini dulu bila ingin menyimpan cadangan.</span>
            </div>
          </>
        )}

        {tahap === "pratinjau" && (
          <>
            <div style={{ background: C.bg, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
              <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 4 }}>Berkas: <strong style={{ color: C.ink }}>{namaFile}</strong></div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.green }}>{data.length} baris siap diimpor</div>
            </div>

            <div style={{ background: C.dangerSoft, borderRadius: 12, padding: "12px 14px", marginBottom: 14, fontSize: 12.5, color: C.danger, lineHeight: 1.6, display: "flex", gap: 8 }}>
              <AlertOctagon size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>
                <strong>{items.length} {judul.toLowerCase()} yang ada sekarang akan dihapus</strong> dan diganti dengan {data.length} data baru.
                Tindakan ini tidak dapat dibatalkan.
              </span>
            </div>

            {katBaru.length > 0 && (
              <div style={{ background: C.greenSoft, borderRadius: 11, padding: "10px 13px", marginBottom: 14, fontSize: 12.5, color: C.green }}>
                Kategori baru yang akan ditambahkan: <strong>{katBaru.join(", ")}</strong>
              </div>
            )}

            <div style={{ fontSize: 11.5, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 }}>
              Pratinjau 3 baris pertama
            </div>
            <div style={{ maxHeight: 210, overflow: "auto", marginBottom: 18 }} className="kbih-scroll">
              {data.slice(0, 3).map((d, i) => (
                <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 11, padding: "10px 12px", marginBottom: 8, background: "#fff" }}>
                  {d.kategori && <Badge bg={C.goldSoft} color={C.goldDeep}>{d.kategori}</Badge>}
                  <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 5 }}>{d[kolom[1].kunci]}</div>
                  {d.arab && <div dir="rtl" className="arab" style={{ fontSize: 22, marginTop: 5 }}>{d.arab}</div>}
                  {d.isi && <div style={{ fontSize: 12.5, color: C.muted, marginTop: 4, lineHeight: 1.5 }}>{String(d.isi).slice(0, 110)}{String(d.isi).length > 110 ? "…" : ""}</div>}
                  {d.latin && <div style={{ fontSize: 12.5, color: C.muted, fontStyle: "italic", marginTop: 3 }}>{d.latin}</div>}
                </div>
              ))}
              {data.length > 3 && <div style={{ fontSize: 12, color: C.muted, textAlign: "center", padding: 6 }}>…dan {data.length - 3} baris lainnya</div>}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button className="btn" onClick={() => { setTahap("pilih"); setData([]); }}
                style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 18px", borderRadius: 11 }}>Kembali</button>
              <button className="btn" onClick={jalankanImpor}
                style={{ background: C.danger, color: "#fff", padding: "11px 20px", borderRadius: 11 }}>
                <Upload size={16} /> Ganti & Impor
              </button>
            </div>
          </>
        )}

        {tahap === "selesai" && (
          <div style={{ textAlign: "center", padding: "26px 10px 10px" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.greenSoft, color: C.green, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <CheckCircle2 size={30} />
            </div>
            <div style={{ fontSize: 16.5, fontWeight: 800, marginBottom: 5 }}>Impor Berhasil</div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 20, lineHeight: 1.6 }}>
              {data.length} {judul.toLowerCase()} sudah masuk dan tersimpan.
              {katBaru.length > 0 && ` ${katBaru.length} kategori baru ikut ditambahkan.`}
            </div>
            <button className="btn" onClick={onClose}
              style={{ background: C.green, color: "#fff", padding: "11px 26px", borderRadius: 12 }}>Selesai</button>
          </div>
        )}
      </div>
    </Modal>
  );
}
