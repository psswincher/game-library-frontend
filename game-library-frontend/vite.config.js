import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "vite-plugin-fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fs()],
  server: {     
    port: 3000, // Change the port number to 3000
  },

})
