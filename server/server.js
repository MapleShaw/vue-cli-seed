
var httpProxy = require('http-proxy');
var config = require('./config');
var logger = require('./logger');

module.exports = function (app) {

  var apiServers = config.API;

  var proxy = httpProxy.createProxyServer();
  
  proxy.on('error', function(e) {
    logger.error(e);
  });

  // 服务器部署验证
  app.get('/health', function (req, res) {
    return res.status(200).send('OK');
  });
  

  app.all('*/szApi/*', function (req, res) {//接口API代理
    var url = req.url;
    console.log('req:', url)
    var regExp = /\/szApi\/(.*?)\//,
      hostkey = req.url.match(regExp)[1],
      target = '';
      
    req.url = req.url.replace(regExp, '/');
    
    target = apiServers[hostkey].host;
    console.log('target:', target);
    console.log('szApi:', target + req.url);
    console.log('-------------------------');
    proxy.web(req, res, {
      target: target,
      changeOrigin: true
    });
  });

};
