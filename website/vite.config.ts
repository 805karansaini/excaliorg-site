import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to optimize CSS loading
    {
      name: 'css-preload-optimization',
      generateBundle(_options, bundle) {
        // Find CSS files in the bundle
        Object.keys(bundle).forEach(fileName => {
          if (fileName.endsWith('.css')) {
            // CSS asset found - could add preload hint generation logic here if needed
          }
        });
      }
    }
  ],
  server: {
    allowedHosts: [
      'flood-comm-prairie-hot.trycloudflare.com',
      'advantage-apparatus-representatives-firmware.trycloudflare.com'
    ]
  },
  build: {
    // Optimize CSS output
    cssCodeSplit: false, // Bundle all CSS into one file for better control
    rollupOptions: {
      output: {
        // Ensure consistent asset naming
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/styles-[hash].css';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
})
