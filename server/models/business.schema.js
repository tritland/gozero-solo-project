var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// new business schema 
var BusinessSchema = new Schema({
    user: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    website: {type: String},
    description: {type: String},
    offerings: [{name: String, is_available: Boolean}],
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
    type: [{name: String, is_type: Boolean}],
    
    },
    
    {collection:
        'businesses'
    }
);

module.exports = mongoose.model('Business', BusinessSchema);
