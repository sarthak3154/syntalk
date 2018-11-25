const speech = require('@google-cloud/speech');
const speechClient = new speech.SpeechClient(); // Creates a client


// The encoding of the audio file, e.g. 'LINEAR16'
// The sample rate of the audio file in hertz, e.g. 16000
// The BCP-47 language code to use, e.g. 'en-US'
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US'; //en-US

const request = {
    config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
        profanityFilter: false,
        enableWordTimeOffsets: true
    },
    interimResults: true // If you want interim results, set this to true
};

exports.textToSpeech = (text) => {
    //TODO text to speech impl
};

let recognizeStream = null;

function stopRecognitionStream() {
    if (recognizeStream) {
        recognizeStream.end();
    }
    recognizeStream = null;
}


exports.initStream = (socket, data) => {
    recognizeStream = speechClient.streamingRecognize(request)
        .on('error', console.error)
        .on('data', (data) => {
            process.stdout.write(
                (data.results[0] && data.results[0].alternatives[0])
                    ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                    : `\n\nReached transcription time limit, press Ctrl+C\n`);
            socket.emit('speechData', data);

            if (data.results[0] && data.results[0].isFinal) {
                stopRecognitionStream();
                this.initStream(socket);
                // console.log('restarted stream serverside');
            }
        });
}

exports.speechToText = (socket, mediaStream) => {
    if (recognizeStream !== null) {
        recognizeStream.write(mediaStream);
    }
};