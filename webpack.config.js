const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["./src/index.ts", "./src/app/app.tsx"],
  mode: "development",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist/build"],
    }),
    new HtmlWebpackPlugin({
      template: "src/templates/index.html",
    }),
  ],
  output: {
    // path:path.resolve(__dirname, 'dist'),
    path: __dirname + "/dist",
    filename: "build/[name].[contenthash].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: "/node_modules",
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
