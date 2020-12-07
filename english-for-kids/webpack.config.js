const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, './src/js/app.js'),
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
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
      ],  
}