import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          'babel-plugin-macros',
          [
            'babel-plugin-import',
            {
              libraryName: '@mui',
              libraryDirectory: '',
              camel2DashComponentName: false,
            },
          ],
        ],
      },
    }),
  ],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, 
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('@remix-run')) {
              return 'vendor-router';
            }
            if (id.includes('@mui')) {
              return 'vendor-mui';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor-others';
          }
        },
      },
    },
  },

  server: {
    port: 5173,
    open: true,
    cors: true,
  },

  preview: {
    port: 3000,
    open: true,
    cors: true,
  },
});