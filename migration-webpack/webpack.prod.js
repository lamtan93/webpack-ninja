const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {PurgeCSSPlugin} = require("purgecss-webpack-plugin"); //Optimize: remove dead CSS
const glob = require("glob"); // To scan all folders, work with purgecss-webpack-plugin
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const PATHS = {
    src: path.resolve(__dirname, "src")
}

module.exports = merge(commonConfig,{
    mode: "production",
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
        new PurgeCSSPlugin({ //Optimize: remove dead or inutil CSS
            paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
            //safelist: ["dummy"] // Optiond: si on ne veut pas qu'il supprimer les class de CSS dans ce tableau
        }),
        
        //Optimize: extract CSS from HTML.
        //Ex: quand il y a un changement dans HTLM, il fait un requete pour update HTML
        //Le CSS n'a pas besoin d'update, restera le meme, c'est l'utilité.
        //Pour éviter également le delay: on voit d'abord le HTML puis 2,3s plustard, on voit le style
        new MiniCssExtractPlugin() 
    ],
})