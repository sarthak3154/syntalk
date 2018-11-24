const SpeechService = require('../Services/SpeechService');
const TranslationService = require('../Services/TranslateService');

speechToText = (mediaStream) => {
    return SpeechService.speechToText(mediaStream);
};

textToSpeech = (text) => {
    return SpeechService.textToSpeech(text);
};

exports.translate = (mediaStream) => {
    const text = speechToText(mediaStream);
    TranslationService.getTranslation(text, TRANSLATION_LANGUAGE, translation => {
        return SpeechService.textToSpeech(translation);
    });
};
