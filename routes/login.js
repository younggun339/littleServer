
const express = require('express');
const path = require('path');
const User = require('../models/user');

const router = express.Router();

router.route('/')
.get((req, res) => {
    //res.send('hello, login');
    res.sendFile(path.join(__dirname, '/views/login.html'));
})
.post(async (req, res, next) => {
    try{
        const user = await User.create({
            name : req.body.name,
            password : req.body.password,
        });
        console.log(user);
        res.status(201).json(user);
    } catch(err){
        console.error(err);
        next(err);
    }

});

module.exports = router;