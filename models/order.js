const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for name
const orderSchema = new Schema({
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
    }
}, { timestamps: true }
);

//create model for order
module.exports = Order = mongoose.model('order', orderSchema);
