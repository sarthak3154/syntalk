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
    interimResults: true
};

let recognizeStream = null, results = [], finalText = null, found = false;

function stopRecognitionStream() {
    if (recognizeStream) {
        recognizeStream.end();
    }
    recognizeStream = null;
}

getFinalTranscribedResult = (data, callback) => {
    const isTextFinal = undefined || data.results[0].isFinal;
    results.shift();
    results.push(data.results[0].alternatives[0].transcript);
    if (isTextFinal && results.length > 0) {
        return results[0];
    } else {
        return null;
    }
};

let transcribedPromise = new Promise((resolve) => {
    exports.initStream = () => {
        recognizeStream = speechClient.streamingRecognize(request)
            .on('error', console.error)
            .on('data', (data) => {
                process.stdout.write(
                    (data.results[0] && data.results[0].alternatives[0])
                        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                        : `\n\nReached transcription time limit, press Ctrl+C\n`);

                if (data.results[0] && data.results[0].isFinal) {
                    stopRecognitionStream();
                    this.initStream();
                }

                if ((finalText = getFinalTranscribedResult(data)) != null) {
                    found = true;
                    resolve();
                }
            });
    };
});

exports.speechToText = (mediaStream, callback) => {
    if (recognizeStream !== null) {
        recognizeStream.write(mediaStream);
    }

    transcribedPromise.then(() => {
        if (found) {
            found = false;
            callback(finalText);
        }
    });
};