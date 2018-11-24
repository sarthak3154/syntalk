const TranslateService = require('../Services/TranslateService');

exports.translateText = (req, res) => {
    const text = req.body.text;
    const target = req.body.target;
    TranslateService.getTranslation(text, target, (translation) => {
        res.status(200).send(translation);
    });
};