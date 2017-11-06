var express = require('express');
var app = express();
var todo = require('./diriver63-schema');
var port = process.env.PORT || 3000;
var api = require('./api');

api(app);
app.listen(port);
