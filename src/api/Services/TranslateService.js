const {Translate} = require('@google-cloud/translate');

const translate = new Translate({
    projectId: GOOGLE_PROJECT_ID,
});

exports.getTranslation = (text, target, callback) => {
    translate
        .translate(text, target)
        .then(results => {
            const translation = results[0];

            /*console.log(`Text: ${text}`);
            console.log(`Translation: ${translation}`);*/
            callback(translation);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
};
