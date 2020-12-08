const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/js/app.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
      },
    plugins: [
        new CopyPlugin({
          patterns: [
            { from: "./src/assets", to: "./assets" },
            "./src/style.css",
            "./src/index.html",
            "./src/cards.json"
          ],
        }),
        new ESLintPlugin()  
      ],
}