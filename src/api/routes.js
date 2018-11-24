const express = require('express');
const router = express.Router();

const translateController = require('./Controllers/TranslateController');

router.post('/v1/textTranslate', translateController.translateText);

module.exports = router;