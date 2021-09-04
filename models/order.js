const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    products: [{
        product: { type: Object, required: true },
        quantity: { type: Number, required: true }
    }],
    user: {
        name: {
            type: String,
            require: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        }
    }
});

module.exports = mongoose.model('Order', Order);