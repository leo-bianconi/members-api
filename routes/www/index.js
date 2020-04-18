const express = require('express');

const router = express.Router();

// API Schemas specifics
const schema = require('../../Schema')

router.get('/', (req, res) => {

    res.render('index', {schema});
});

module.exports = router;