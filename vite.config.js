import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
  manifest: {
    name: "Notelicious",
    short_name: "Notelicious",
    description: "The perfect note list for you!",
    theme_color: "#ffffff",
    backgroun_color: "#ffffff",
    display: "standalone",
    "start_url": "/Notelicious/",
    "scope": "/Notelicious/",
    // orientation: 'portrait',
    icons: [
      {
        src: './public/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: './public/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: './public/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: './public/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  base: "https://asgoDev.github.io/Notelicious",
});
