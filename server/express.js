var cookieParser = require('cookie-parser');
var history = require('connect-history-api-fallback');
var compression = require('compression');
var config = require('./config');

module.exports = function (app) {
  app.set('views', config.root + '/views');
  app.engine('.html', require('ejs').__express);
  app.set('view engine', 'html');
  app.use(history());
  app.use(compression());
  app.use(cookieParser());
}