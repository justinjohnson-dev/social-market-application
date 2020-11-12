const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for name
const orderResponseSchema = new Schema({
    items: {
        type: String,
        required: true,
        maxlength: 2000
    },
    quantity: {
        type: String,
        required: true,
        maxlength: 500
    },
    userId: {
        type: String,
        trim: true
    },
    farmerId: {
        type: String,
        trim: true
    },
    comment: {
        type: String
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

//create model for order
module.exports = OrderResponse = mongoose.model('orderResponse', orderResponseSchema);
