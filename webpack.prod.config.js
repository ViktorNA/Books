const config = require('./webpack.config.js');
const webpack = require('webpack');

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

module.exports = config;
