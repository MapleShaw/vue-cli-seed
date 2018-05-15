
var express = require('express');
var config = require('./server/config');

var app = express();
require('./server/express')(app);
app.use(express.static(config.root + '/dist'))
require('./server/server')(app);
require('./server/error')(app);
require('./bin/www')(app);
