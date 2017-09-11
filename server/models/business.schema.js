var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// new business schema 
var BusinessSchema = new Schema({
    name: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    zip: {type: String, required: true},
    website: {type: String, required: true},
    description: {type: String},
    offerings: {type: Array},    
    image_url: {type: String}
    },
    
    {collection:
        'businesses'
    }
);

module.exports = mongoose.model('Business', BusinessSchema);