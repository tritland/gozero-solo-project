var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// new business schema 
var BusinessSchema = new Schema({
    user: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    website: {type: String},
    description: {type: String},
    offerings: {type: Array},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
    type: {type: String},
    
    },
    
    {collection:
        'businesses'
    }
);

module.exports = mongoose.model('Business', BusinessSchema);
