const path = require("path");
import htmlPurge from "vite-plugin-purgecss";

export default {
    root: path.resolve(__dirname, "src"),
    base: "",
    publicDir: path.resolve(__dirname, "public"),
    build: {
        outDir: path.resolve(__dirname, "dist"),
        rollupOptions: {
            input: {
              
                index: path.resolve(__dirname, "src/index.html"),                
                // quiztdc: path.resolve(__dirname, "src/quiz-tdc.html"),                
                error404: path.resolve(__dirname, "src/404.html"), 
                error500: path.resolve(__dirname, "src/500.html"), 
                error502: path.resolve(__dirname, "src/502.html"), 
            },
            output: {
                chunkFileNames: "js/[name]-[hash].js",
                entryFileNames: "js/[name]-[hash].js",

                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
                        return "img/[name]-[hash][extname]";
                    }

                    if (/\.css$/.test(name ?? "")) {
                        return "css/[name]-[hash][extname]";
                    }

                    return "assets/[name]-[hash][extname]";
                },
            },
        },
    },
    resolve: {
        alias: {
            "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
        },
    },
    server: {
        /* port: 8080, */
        hot: true,
    },
    // plugins: [htmlPurge({})],
};
