const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "./dist"),
        assetModuleFilename: "images/[hash][ext]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /.(png|jpeg|gif|svg)$/,
                type: "asset/resource"
            },
            {
                test: /.(ttf|woff|woff2)$/,
                type: 'asset/resource'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            chunks: "all",
            inject: true,
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        port: 3000
    }

}