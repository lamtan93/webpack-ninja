const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");//Optimaze: Shimming

module.exports = {
    entry: {
        index: './src/index.js',
        courses: './src/pages/courses.js'
    },
    output: {//Optimize: add hash version - optimize the cache browser
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [],
    },
    plugins: [
        new webpack.ProvidePlugin({ // Shimming - exporter un objet global dans toute application
            $: "jquery" // s'assurer que jquery existe dans dependencies dans package.json
        }),
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
    ],
    //Optimize: webpack split chunk(build a bubdle for all dependencies communes, then cached by brwoser)
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
}