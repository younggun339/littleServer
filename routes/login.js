
const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    //res.send('hello, login');
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

module.exports = router;