const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin"); // NOTE: плагин генерирует HTML файл, затем вставляет в него скрипт и записывает на dist/index.html
const webpack = require('webpack');
const env = require('dotenv').config({path: __dirname + '/.env'}).parsed;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index_bundle.js",
  },
  devServer: {
    port: env.PORT || 3000
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
  resolve: {
    modules: [path.join(__dirname, env.NODE_PATH || "src"), "node_modules"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env || {})
    })    
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_PATH: 'src/',
    //     PORT: 3456,
    //     ...dotenv.parsed
    //   },
    // }),    
    // new Dotenv({
    //   path: './.env', // Path to .env file (this is the default)
    //   safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
    // })
  ]    
};
