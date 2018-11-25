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

textToSpeech = (text) => {
    return SpeechService.textToSpeech(text);
};

exports.translate = (socket, mediaStream) => {
    speechToText(socket, mediaStream, textToTranslate => {
        TranslationService.getTranslation(textToTranslate, TRANSLATION_LANGUAGE, translation => {
            console.log('Translated text: ' + translation);
        })
    });
};
