const path = require("path");
const webpack = require("webpack");

const PATHS = {
  entry: path.join(__dirname, "src"),
  lib: path.join(__dirname, "lib")
};

function umd({ minify } = {}) {
  const config = {
    entry: PATHS.entry,
    output: {
      path: PATHS.lib,
      filename: minify ? "priority-queue.min.js" : "priority-queue.js",
      libraryTarget: "umd",
      library: "Heap"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: PATHS.entry,
          loader: "babel-loader"
        }
      ]
    }
  };

  if(minify) {
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ];
  }

  return config;
}

module.exports = function() {
  return [umd(), umd({ minify: true })];
};
