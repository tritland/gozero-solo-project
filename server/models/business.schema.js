var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// new business schema 
var BusinessSchema = new Schema({
    user: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    website:{type: String},
    offering:{type: String},
    latitude: {type: String},
    longitude:{type: String} 


    },
    
    {collection:
        'businesses'
    }
);

module.exports = mongoose.model('Business', BusinessSchema);



// street: {type: String},
// city: {type: String},
// zip: {type: String},
// description: {type: String},
// offerings: {type: Array},    
// image_url: {type: String}