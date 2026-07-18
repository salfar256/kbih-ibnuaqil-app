import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE_PATH diisi otomatis oleh GitHub Actions dengan "/nama-repo/".
// Untuk Firebase Hosting atau saat menjalankan di komputer, nilainya "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || "/",
});
