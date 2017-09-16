const path = require("path");
const webpack = require("webpack");

const PATHS = {
  entry: path.join(__dirname, "src"),
  lib: path.join(__dirname, "lib")
};

const DEPENDENCIES = [
  path.join(__dirname, "node_modules", "@markon95", "heap")
];

function umd({ minify } = {}) {
  const config = {
    entry: PATHS.entry,
    output: {
      path: PATHS.lib,
      filename: minify ? "priority-queue.min.js" : "priority-queue.js",
      libraryTarget: "umd",
      library: "PriorityQueue"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [PATHS.entry, ...DEPENDENCIES],
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
