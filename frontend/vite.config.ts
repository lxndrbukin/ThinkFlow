import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/history": "http://localhost:8000",
      "/chats": "http://localhost:8000",
    },
  },
});
