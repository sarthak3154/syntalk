const SpeechService = require('../Services/SpeechService');
const TranslationService = require('../Services/TranslateService');

speechToText = (mediaStream, callback) => {
    SpeechService.speechToText(mediaStream, text => {
        if (text !== null) {
            callback(text);
        }
    });
};

findOtherUser = (socket, users) => {
    const others = [];
    users.forEach(user => {
        if (socket.id !== user) {
            others.push(user);
        }
    });
    return others[0];
};

exports.initStream = () => {
    SpeechService.initStream();
};

exports.endStream = () => {
    SpeechService.endStream();
};

textToSpeech = (socket, users, text) => {
    const socketId = findOtherUser(socket, users);
    socket.to(`${socketId}`).emit('translation', text);
};

exports.translate = (socket, users, mediaStream) => {
    speechToText(mediaStream, textToTranslate => {
        TranslationService.getTranslation(textToTranslate, TRANSLATION_LANGUAGE, translation => {
            if (translation !== null) {
                textToSpeech(socket, users, translation);
            }
        })
    });
};
