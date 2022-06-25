const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// module.exports = {

// };
module.exports = defineConfig({
    chainWebpack: (config) => {
        config.plugin("polyfills").use(NodePolyfillPlugin);
    },
    // transpileDependencies: true,
    configureWebpack: {
        plugins: [new NodePolyfillPlugin()],
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
    },
});
