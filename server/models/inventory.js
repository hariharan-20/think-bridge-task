var mongoose = require('mongoose')


var inventory = mongoose.Schema({   
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('inventory',inventory,'inventory')