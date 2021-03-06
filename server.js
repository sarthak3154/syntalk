require('./src/constants');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//Controller
const SpeechController = require('./src/Controllers/SpeechController');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: "*"}));

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
});

const users = [];

io.origins('*:*');
io.on('connection', (socket) => {
    console.log('User connected. Socket Id: ' + socket.id);
    //Adding a new user socket id
    users.push(socket.id);

    socket.on('startGoogleCloudStream', (data) => {
        SpeechController.initStream();
    });

    socket.on('endGoogleCloudStream', () => {
        SpeechController.endStream();
    });

    socket.on('binaryData', (data) => {
        SpeechController.translate(socket, users, data);
    });
});


http.listen(HTTP_PORT, (err) => {
    if (err) throw err;
    console.log('HTTP server running on port: ' + HTTP_PORT);
});

module.exports = http;