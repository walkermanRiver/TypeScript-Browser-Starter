const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = {
  // entry: ["./src/index.tsx", "./src/app/app.tsx"],
  entry: ["./src/index.tsx"],
  mode: "development",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist/build"],
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      // favicon: "public/favicon.ico",
    }),
    new FaviconsWebpackPlugin("public/favicon.ico"), // svg works too!
    new ESLintPlugin({
      extensions: [".tsx", ".ts", ".js", ".jsx"],
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
      {
        test: /\.css$/, //test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      // {
      //   test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      //   loader: "file-loader?name=[name].[ext]", // <-- retain original file name
      // },
    ],
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
