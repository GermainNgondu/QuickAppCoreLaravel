import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'app/Core/Resources/css/app.css',
                'app/Core/Resources/js/core/app.jsx',
            ],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {

            '@': path.resolve(__dirname, 'app/Core/Resources/js'),
            '@core': path.resolve(__dirname, 'app/Core/Resources/js/core'),
            '@ui': path.resolve(__dirname, 'app/Core/Resources/js/components/ui'),
            '@shared': path.resolve(__dirname, 'app/Core/Resources/js/components/shared'),
            '@composite': path.resolve(__dirname, 'app/Core/Resources/js/components/composite'),
            '@domains': path.resolve(__dirname, 'app/Core/Resources/js/domains'),
            '@hooks': path.resolve(__dirname, 'app/Core/Resources/js/hooks'),
            '@layouts': path.resolve(__dirname, 'app/Core/Resources/js/layouts'),
            '@lib': path.resolve(__dirname, 'app/Core/Resources/js/lib'),
            '@providers': path.resolve(__dirname, 'app/Core/Resources/js/providers'),
            '@features': path.resolve(__dirname, 'Features'),
        },
    },
    server: {
        watch: {
            usePolling: true,
            ignored: ['**/storage/framework/views/**'],
        },
    },

    build: {
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
            },
        },
    },
});