var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Business = require('../models/business.schema.js');

//gets all documents from 'businesses' collection
router.get('/', function (req, res) {
    console.log('hit business get route');
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
  
 var businessToSave = {
        user: req.user.username,
        name: req.body.name,
        address: req.body.formatted_address,
        website: req.body.website,
        description: req.body.description,
        offerings: req.body.offerings,
        latitude: req.body.geometry.location.lat,
        longitude: req.body.geometry.location.lng
    }

var savedBusiness = new Business(businessToSave);

  
      console.log('this is the savedBusiness ==> ', savedBusiness)
  
      Business.create(savedBusiness, function(err, post) {
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

  router.delete('/:id', function (req, res) {
    
        if (req.isAuthenticated()) { // is the user logged in?
    
            var businessToDelete = {};
    
            console.log('req.params.id ==>', req.params.id);
            
    
            Business.findById(req.params.id, function(err, data){
                if (err){
                    console.log('delete find error:', err);
                    res.sendStatus(500);
                } else {
                    console.log('no result');
                    console.log('data:', data);
                    
                    businessToDelete = data;
                } 
                console.log('Current user ==>', req.user.username);
                console.log('User who placed item ==>', businessToDelete.user);
                
                if (req.user.username === businessToDelete.user){ // is the user the same one who added it?
                    Business.findByIdAndRemove({ _id: req.params.id }, function (err) {
                        if (err) {
                            console.log('delete error', err);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        };
                    });
                } else {
                    res.sendStatus(500);
                }
            });                      
        };
    });


module.exports = router;