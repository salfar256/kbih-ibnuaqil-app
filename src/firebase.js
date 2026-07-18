// ============================================================
// Koneksi ke Firebase — KBIH Ibnu Aqil
// ============================================================
// Catatan: nilai di bawah ini AMAN untuk publik. Berbeda dengan
// token Telegram, kunci Firebase memang dirancang terlihat dari
// browser. Keamanan data dijaga oleh Security Rules + login,
// bukan dengan menyembunyikan kunci ini.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF7IETUVXiFRvMA_joWm3J3sj6SvkARBk",
  authDomain: "kbih-ibnuaqil-app.firebaseapp.com",
  databaseURL: "https://kbih-ibnuaqil-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kbih-ibnuaqil-app",
  storageBucket: "kbih-ibnuaqil-app.firebasestorage.app",
  messagingSenderId: "937378677357",
  appId: "1:937378677357:web:4fa831ff423c93f6373564",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
