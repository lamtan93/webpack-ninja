const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        courses: './src/pages/courses.js'
    },
    output: {//Optimize: add hash version - optimize the cache browser
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        static: './dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['index'],
            filename: 'index.html',
            inject: true,
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/courses.html',
            chunks: ['courses'],
            filename: 'courses.html',
            inject: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/assets/images/*'),
                    to: path.resolve(__dirname, "dist"),
                    context: "src" // Préciser qu'on ne veut pas avoir le dossier src dans dist
                }
            ]
        }),
        //new BundleAnalyzerPlugin({})

        //Optimize: extract CSS from HTML.
        //Ex: quand il y a un changement dans HTLM, il fait un requete pour update HTML
        //Le CSS n'a pas besoin d'update, restera le meme, c'est l'utilité.
        //Pour éviter également le delay: on voit d'abord le HTML puis 2,3s plustard, on voit le style
        new MiniCssExtractPlugin() 
    ],
    //Optimize: webpack split chunk(build a bubdle for all dependencies communes, then cached by brwoser)
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
}