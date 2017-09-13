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


// Handles POST request with new business data
router.post('/', function(req, res, next) {
    console.log('post /business route');
    /*
   user: {type: String, required: true},
    name: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    zip: {type: String, required: true},
    website: {type: String, required: true},
    description: {type: String},
    offerings: {type: Array},    
    image_url: {type: String}
    */

var businessToSave = new Business(req.body);

businessToSave.user = req.user.username;

    //   var businessToSave = {
    //     user: req.body.username,
    //     name: req.body.name,
    //     street: req.body.street,
    //     city: req.body.city,
    //     zip: req.body.zip,
    //     // website: req.body.website,
    //     // description: req.body.description
    //   };
  
      console.log('this is the businesssToSave ==> ', businessToSave)
  
      Business.create(businessToSave, function(err, post) {
        console.log('post /business -- Business.create');
           if(err) {
             console.log('post /business -- Business.create -- failure');
             res.sendStatus(500);
           } else {
             console.log('post /business -- Business.create -- success');
             res.sendStatus(201);
           }
      });
  });

module.exports = router;