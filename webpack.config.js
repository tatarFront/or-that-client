const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin"); // NOTE: плагин генерирует HTML файл, затем вставляет в него скрипт и записывает на dist/index.html

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader" // NOTE: загрузка наших JSX/JavaScript файлов
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // NOTE: добавит все стили внутрь тега документа style
          "css-loader", // NOTE: загрузка и объединения всех CSS файлов в один
        ]
      }
    ],  
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]    
};
