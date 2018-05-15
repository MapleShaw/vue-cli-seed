
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var path = require('path');
var config = require('./webpack.dev.conf');

var app = express();
var compiler = webpack(config);
require('../server/express')(app);
app.use(webpackMiddleware(compiler, { 
	noInfo: true,
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
}));
app.use(webpackHotMiddleware(compiler));

require('../server/server')(app);
require('../server/error')(app);
require('../bin/www')(app);


// force page reload when html-webpack-plugin template changes  
compiler.plugin('compilation', function (compilation) {  
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {  
    webpackHotMiddleware.publish({ action: 'reload' })  
    cb()  
  })  
})  