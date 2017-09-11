var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Business = require('../models/business.schema.js');

//gets all documents from 'businesses' collection
router.get('/', function (req, res) {
    console.log('hit shelf get route');
    Business.find({}, function (err, data) {
        if (err) {
            console.log('find error', err);
            res.sendStatus(500);
        } else {
            res.send(data);
            console.log(data);
        };
    });
});

module.exports = router;