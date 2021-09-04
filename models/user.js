const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: {
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Product'
                    },
                    quantity: {
                        type: Number,
                        required: true
                    }
                }]
        }
    }
});

User.methods.addToCart = function (product) {
    const index = this.cart.items.findIndex(i => i.productId.toString() === product._id.toString());
    const cartItems = [...this.cart.items];

    if (index > -1) {
        cartItems[index].quantity = cartItems[index].quantity + 1;
    } else {
        cartItems.push({ productId: product._id, quantity: 1 });
    }
    this.cart.items = cartItems;
    return this.save();
}

User.methods.deleteFromCart = function (id) {
    this.cart.items = this.cart.items.filter(i => i.productId.toString() !== id.toString());
    return this.save();
}

User.methods.clearCart = function () {
    this.cart = { items: [] }
    this.save();
}

module.exports = mongoose.model('User', User);