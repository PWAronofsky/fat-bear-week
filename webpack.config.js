const currentTask = process.env.npm_lifecycle_event
const path = require('path');

const config = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      { test: /\.css$/, 
        use: [ 'style-loader', 'css-loader' ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: ['url-loader?limit=100000'],
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, './public'),
    filename: "bundle.js",
  },
  devServer: {
    static: path.resolve(__dirname, './public'),
  },
};

// if (currentTask == "webpackDev" || currentTask == "dev") {
//   config.devtool = "source-map"
//   config.devServer = {
//     port: 3000,
//     static: {
//       directory: path.join(__dirname, "app")
//     },
//     hot: true,
//     liveReload: false,
//     historyApiFallback: { index: "index.html" },
//   }
// }

// if (currentTask == "webpackBuild") {
//   config.plugins.push(new CleanWebpackPlugin(), new RunAfterCompile())
//   config.mode = "production"
//   config.output = {
//     publicPath: "/",
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name].[chunkhash].js",
//     chunkFilename: "[name].[chunkhash].js",
//   }
// }

module.exports = config