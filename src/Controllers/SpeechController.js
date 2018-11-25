const SpeechService = require('../Services/SpeechService');
const TranslationService = require('../Services/TranslateService');

speechToText = (socket, mediaStream, callback) => {
    SpeechService.speechToText(socket, mediaStream, text => {
        if (text !== null) {
            callback(text);
        }
    });
};

exports.initStream = (socket, data) => {
    SpeechService.initStream(socket, data);
};

textToSpeech = (socket, text) => {
    socket.emit('translation', text);
};

exports.translate = (socket, mediaStream) => {
    speechToText(mediaStream, textToTranslate => {
        TranslationService.getTranslation(textToTranslate, TRANSLATION_LANGUAGE, translation => {
            if (translation !== null) {
                textToSpeech(socket, translation);
            }
        })
    });
};
