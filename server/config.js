var path = require('path');
var extend = require('util')._extend;

var dev = require('./env/dev');
var test = require('./env/test');
var pre = require('./env/pre');
var prd = require('./env/prd');

var defaults = {
  root: path.normalize(__dirname + '/..')
};

module.exports = {
  dev: extend(dev, defaults),
  test: extend(test, defaults),
  pre: extend(pre, defaults),
  prd: extend(prd, defaults)
}[process.env.DEPLOY_ENV || 'dev'];
