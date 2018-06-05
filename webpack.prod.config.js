const config = require('./webpack.config.js');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
config.plugins.push(
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production")
    }
  })
);

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            sequences     : true,
            booleans      : true,
            loops         : true,
            unused      : true,
            warnings    : false,
            drop_console: true,
            unsafe      : true
        }
    })
);

config.plugins.push(
  new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })
)

config.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true,
    })
)

module.exports = config;
