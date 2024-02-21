const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./lib/web-dev.js",
  devtool: 'inline-source-map',
  devServer: {
    static: './web-dev',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "web-dev"),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
};