import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to your backend
      "/api": {
        target: "http://localhost:3000", // Your Express backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
