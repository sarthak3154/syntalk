const SpeechService = require('../Services/SpeechService');
const TranslationService = require('../Services/TranslateService');

speechToText = (socket, mediaStream) => {
    SpeechService.speechToText(socket, mediaStream);
};

exports.initStream = (socket, data) => {
    SpeechService.initStream(socket, data);
};

textToSpeech = (text) => {
    return SpeechService.textToSpeech(text);
};

exports.translate = (socket, mediaStream) => {
    speechToText(socket, mediaStream);
};
