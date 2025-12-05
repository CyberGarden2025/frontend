import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {

    return {
        root: __dirname,
        cacheDir: '../../node_modules/.vite/apps/frontend',
        server: {
            port: 4200,
            host: 'localhost',
        },
        preview: {
            port: 4200,
            host: 'localhost',
        },
        plugins: [
            react(),
        ],
        resolve: {
            alias: {
                '@styles': '/src/app/styles',
                '@app': '/src/app',
                '@pages': '/src/pages',
                '@shared': '/src/shared',
                '@assets': '/src/shared/assets',
                '@widgets': '/src/widgets',
                '@features': '/src/features',
                '@entities': '/src/entities',
                '@store': '/src/shared/lib/store',
            },
        },
        // Uncomment this if you are using workers.
        // worker: {
        //  plugins: [ nxViteTsPaths() ],
        // },
        build: {
            outDir: './dist',
            emptyOutDir: true,
            reportCompressedSize: true,
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        },
    };
});
