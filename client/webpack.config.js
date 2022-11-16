const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
// const MiniCssExtract.Plugin = require("mini-css-extract");
// const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "Webpack Plugin",
    }),
    // new WorkboxPlugin.GenerateSW({
    //   // Do not precache images
    //   exclude: [/\.(?:png|jpg|jpeg|svg)$/],
    //   // Define runtime caching rules
    //   runtimeCaching: [
    //     {
    //       // Macth any request that ends with ...
    //       urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
    //       // Apply a cache-first stragety
    //       handler: "CacheFirst",
    //       options: {
    //         // use a custom cache name
    //         cacheName: "images",
    //         // Only cache 1 images
    //         expiration: {
    //           maxEntries: 1,
    //         },
    //       },
    //     },
    //   ],
    // }),
    new InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
