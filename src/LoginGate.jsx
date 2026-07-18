import React, { useState } from "react";
import { LogIn, Mail, KeyRound, AlertTriangle, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { masuk, lupaSandi, pesanGalat } from "./cloud";

const C = {
  green: "#0f5c37", greenDeep: "#0a4327", greenSoft: "#e7f0ea",
  gold: "#bd922a", goldSoft: "#f4ead0", bg: "#f4f6f2", ink: "#17241d",
  muted: "#68766c", border: "#e3e8df", danger: "#b23b3b", dangerSoft: "#f7e7e6",
};

export default function LoginGate({ logo }) {
  const [mode, setMode] = useState("masuk"); // masuk | lupa
  const [email, setEmail] = useState("");
  const [sandi, setSandi] = useState("");
  const [galat, setGalat] = useState("");
  const [info, setInfo] = useState("");
  const [sibuk, setSibuk] = useState(false);

  const kirim = async () => {
    setGalat(""); setInfo("");
    if (!email.trim()) return setGalat("Email belum diisi.");
    if (mode !== "lupa" && sandi.length < 6) return setGalat("Kata sandi minimal 6 karakter.");
    setSibuk(true);
    try {
      if (mode === "masuk") await masuk(email, sandi);
      else {
        await lupaSandi(email);
        setInfo(`Tautan atur ulang kata sandi sudah dikirim ke ${email.trim()}. Buka email tersebut, buat kata sandi baru, lalu kembali ke sini untuk masuk.`);
      }
    } catch (e) { setGalat(pesanGalat(e)); }
    setSibuk(false);
  };

  const judul = mode === "masuk" ? "Masuk" : "Lupa Kata Sandi";
  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    padding: "13px 14px 13px 42px",
    border: `1px solid ${C.border}`, borderRadius: 12, background: "#fff",
    fontSize: 16,               // 16px mencegah layar ikut membesar di iPhone
    fontFamily: "inherit", color: C.ink, display: "block",
  };

  return (
    <div className="lg-wrap" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", minHeight: "100vh", background: `linear-gradient(150deg, ${C.greenDeep} 0%, ${C.green} 55%, #12693e 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .lg-wrap *, .lg-wrap *::before, .lg-wrap *::after { box-sizing: border-box; }
        .lg-field { -webkit-appearance: none; appearance: none; max-width: 100%; }
        .lg-field:focus { outline: none; border-color: ${C.green}; box-shadow: 0 0 0 3px ${C.green}22; }
        @media (max-width: 420px) {
          .lg-kartu { padding: 22px 18px !important; border-radius: 20px !important; }
        }
        .lg-btn { border: none; cursor: pointer; font-family: inherit; font-weight: 700; transition: all .15s ease; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
        .lg-btn:active { transform: translateY(1px); }
        .lg-spin { animation: lgspin 1s linear infinite; }
        @keyframes lgspin { to { transform: rotate(360deg); } }
      `}</style>
      <div style={{ position: "absolute", inset: 0, opacity: .13, backgroundImage: "radial-gradient(circle at 15% 25%, #ffffff44 0 2px, transparent 2px), radial-gradient(circle at 78% 65%, #ffffff33 0 2px, transparent 2px)", backgroundSize: "48px 48px" }} />

      <div className="lg-kartu" style={{ background: "#fff", borderRadius: 24, padding: 30, width: 400, maxWidth: "100%", boxShadow: "0 24px 60px rgba(0,0,0,.28)", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          {logo && <img src={logo} alt="KBIH Ibnu Aqil" style={{ width: 76, height: 76, borderRadius: 18, display: "block", margin: "0 auto 12px", border: `1px solid ${C.border}` }} />}
          <div className="serif" style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 21, fontWeight: 700, color: C.ink }}>KBIH Ibnu Aqil</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3 }}>Melayani dengan Ikhlas, Membimbing dengan Amanah</div>
        </div>

        <div style={{ height: 1, background: C.border, margin: "0 0 20px" }} />

        <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: C.ink }}>{judul}</h2>
        <p style={{ margin: "0 0 18px", fontSize: 12.5, color: C.muted }}>
          {mode === "masuk" ? "Untuk pembimbing dan jamaah." : "Berlaku untuk akun pembimbing maupun jamaah."}
        </p>

        <div style={{ position: "relative", marginBottom: 12 }}>
          <Mail size={17} color={C.muted} style={{ position: "absolute", left: 14, top: 15, pointerEvents: "none" }} />
          <input className="lg-field" style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && kirim()} placeholder="Email" autoComplete="email" />
        </div>

        {mode !== "lupa" && (
          <div style={{ position: "relative", marginBottom: 12 }}>
            <KeyRound size={17} color={C.muted} style={{ position: "absolute", left: 14, top: 15, pointerEvents: "none" }} />
            <input className="lg-field" style={inputStyle} type="password" value={sandi} onChange={(e) => setSandi(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && kirim()} placeholder="Kata sandi" autoComplete="current-password" />
          </div>
        )}

        {galat && (
          <div style={{ display: "flex", gap: 7, alignItems: "flex-start", background: C.dangerSoft, color: C.danger, borderRadius: 10, padding: "10px 12px", fontSize: 12.5, marginBottom: 12 }}>
            <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} /> {galat}
          </div>
        )}
        {info && (
          <div style={{ background: C.greenSoft, color: C.green, borderRadius: 10, padding: "11px 13px", fontSize: 12.5, marginBottom: 12, lineHeight: 1.55 }}>{info}</div>
        )}

        {mode === "lupa" && !info && (
          <div style={{ background: C.bg, color: C.muted, borderRadius: 10, padding: "11px 13px", fontSize: 12, marginBottom: 12, lineHeight: 1.55 }}>
            Masukkan email yang dipakai untuk masuk. Kami kirimkan tautan untuk membuat kata sandi baru.
            Bila email tidak kunjung datang, periksa folder <strong>Spam</strong>.
          </div>
        )}

        <button className="lg-btn" onClick={kirim} disabled={sibuk}
          style={{ width: "100%", background: sibuk ? C.muted : C.green, color: "#fff", padding: "13px", borderRadius: 12, fontSize: 14.5 }}>
          {sibuk ? <Loader2 size={18} className="lg-spin" /> : <LogIn size={18} />}
          {sibuk ? "Memproses…" : mode === "masuk" ? "Masuk" : "Kirim Tautan"}
        </button>

        <div style={{ marginTop: 16, textAlign: "center", fontSize: 12.5, color: C.muted, display: "flex", flexDirection: "column", gap: 8 }}>
          {mode === "masuk" && (
            <>
              <button className="lg-btn" onClick={() => { setMode("lupa"); setGalat(""); setInfo(""); }}
                style={{ width: "100%", background: C.bg, color: C.green, fontWeight: 700, fontSize: 13, padding: "11px", borderRadius: 11, border: `1px solid ${C.border}` }}>
                <KeyRound size={15} /> Lupa kata sandi?
              </button>
              <div style={{ marginTop: 2, fontSize: 12, lineHeight: 1.55 }}>
                Belum punya akun? Hubungi pembimbing Anda untuk dibuatkan.
              </div>
            </>
          )}
          {mode !== "masuk" && (
            <button className="lg-btn" onClick={() => { setMode("masuk"); setGalat(""); setInfo(""); }} style={{ background: "none", color: C.green, fontSize: 12.5 }}><ArrowLeft size={14} /> Kembali ke halaman masuk</button>
          )}
        </div>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}`, fontSize: 11.5, color: C.muted, lineHeight: 1.5 }}>
          <span style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
            <ShieldCheck size={14} color={C.green} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Akun hanya dibuat oleh pembimbing. Aplikasi ini menyimpan data pribadi dan kesehatan jamaah — mohon jaga kerahasiaan akun Anda dan jangan bagikan kata sandi.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
