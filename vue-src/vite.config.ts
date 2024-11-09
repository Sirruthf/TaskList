import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default {
    plugins: [
        vue()
    ],
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: "main.index.html"
            },
            output: {
                entryFileNames: "js/[name].js",
                assetFileNames: "css/[name].[ext]"
            }
        },
        outDir: "../static",
        assetsDir: "../static"
    }
} satisfies UserConfig