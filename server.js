require('./src/constants');
const express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./src/api/routes');
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api', routes);


app.listen(HTTP_PORT, (err) => {
    if (err) throw err;
    console.log('Express server running on port: ' + HTTP_PORT);
});

module.exports = app;