import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  base: '/', // Important for correct asset paths
  server: {
    historyApiFallback: true // Optional: good for dev server
  }
});