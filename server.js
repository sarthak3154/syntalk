require('./src/constants');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const logger = require('morgan');
const bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('media', (mediaStream) => {
        // socket.emit('translation', SpeechController.translate(mediaStream));
    })
});


http.listen(HTTP_PORT, (err) => {
    if (err) throw err;
    console.log('HTTP server running on port: ' + HTTP_PORT);
});

module.exports = http;