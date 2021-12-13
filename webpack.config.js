const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

const appBuildPath = path.resolve(__dirname, "build");
const appSource = path.resolve(__dirname, "src");

module.exports = {
  //possible value: production, development
  mode: "production", //development
  devtool: "source-map", //cheap-module-source-map
  //entry表示入口，webpack执行构建的第一步将从entry开始，可以抽象成输入
  // entry: "./app/entry", //只有一个入口，入口只有一个文件
  // entry: ["./app/entry1", "./app/entry2"], //只有一个入口，入口有两个文件夹
  // entry: {
  //   //有两个入口
  //   a: "./app/entry-a",
  //   b: ["./app/entry-b1", "./app/entry-b2"],
  // },
  entry: ["./src/index.tsx", "./src/index.ts"],
  output: {
    //输出文件存放的目录，必须是string类型的绝对路径
    path: appBuildPath,

    //输出文件的名称
    // filename: "bundle.js", // 完整的名称
    // filename: "[name].js", //在配置了多个entry时，通过名称模板为不同的entry生成不同的文件名称
    // filename: "[chunkhash].js", //根据文件内容的hash值生成文件的名称，用于浏览器长时间缓存文件
    filename: "static/js/[name].[contenthash:8].js",

    //附加chunk的文件名称
    // chunkFilename: "[id].js",
    // chunkFilename: "[chunkhash].js",
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",

    //发布到线上的所有资源URL前缀，为string类型
    // publicPath: "/assets/", //放到指定目录下
    // publicPath: "", //放到根目录下
    // publicPath: "https://cdn.example.com/", //放到CDN上
    publicPath: "auto", // relative to HTML page

    //浏览器开发行和工具里显示的源码模块名称
    // devtoolModuleFilenameTemplate: "webpack:///[resource-path]",
    // devtoolModuleFilenameTemplate:
    //   "webpack://[namespace]/[resource-path]?[loaders]",
    // devtoolModuleFilenameTemplate: "webpack:///[resource-path]?[loaders]",
    devtoolModuleFilenameTemplate: (info) => {
      return path
        .relative(appSource, info.absoluteResourcePath)
        .replace(/\\/g, "/");
    },
  },
  optimization: {
    //improvement over CommonsChunkPlugin
    splitChunks: {
      chunks: "all",
      //boolean = false function (module, chunks, cacheGroupKey) => string string
      //default: false;
      name: false,
    },
    //作用是将包含chunks映射关系的list提取出来，
    //因为每一个chunk的id基本都是基于内容hash出来的，所以你每次改动都会影响它，如果不把它提取出来的话，等于app.js每次都会改变，缓存就失效了。
    //在使用 CommonsChunkPlugin的时候，我们也通常把webpack runtime 的基础函数提取出来，单独作为一个chunk,
    //毕竟code splitting想把不变的代码单独抽离出来，方便浏览器缓存，提升加载速度。其实就是单独分离出webpack的一些运行文件。
    //default: false;
    //possible value: true,multiple,single, function
    runtimeChunk: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      //need more investivation on other options
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      //do not use this option because the generated favicon has no type="image/x-icon" in html
      // favicon: "public/favicon.ico",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./public",
          globOptions: {
            ignore: ["**/index.html"],
          },
          // to: "./dist2",
        },
      ],
    }),
    new ESLintPlugin({
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    }),
  ],

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      //  配置loader
      {
        oneOf: [
          {
            // test: /\.tsx?$/,
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: [appSource],
            use: [
              //使用哪些loader,有先后次序，从后向前执行
              {
                loader: "babel-loader",
                options: {
                  // This is a feature of `babel-loader` for webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: true,
                  cacheCompression: false,
                },
              },
            ],
            exclude: "/node_modules",
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              cacheDirectory: true,
              // See #6846 for context on why cacheCompression is disabled
              cacheCompression: false,

              // Babel sourcemaps are needed for debugging into node_modules
              // code.  Without the options below, debuggers like VSCode
              // show incorrect code and set breakpoints on the wrong lines.
              sourceMaps: true,
              inputSourceMap: true,
            },
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
    ],
  },
  devServer: {
    // static: path.resolve(__dirname, "build");,
    compress: true,
    port: 9000,
  },
};
