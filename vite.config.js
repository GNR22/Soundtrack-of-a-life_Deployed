import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    // ADD THIS SECTION BELOW:
    build: {
        chunkSizeWarningLimit: 1600, // Increases limit to 1600 KB (1.6 MB)
    },
});
