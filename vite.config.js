import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/apitube": {
        target: "http://localhost:3001", // Dirección del backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});