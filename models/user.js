const mongodb = require('mongodb');
const db = require('../util/db');

class User {

    constructor(id, name, email, cart) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.cart = cart;
    }

    save() {
        return db.getDbInstance()
            .collection('users')
            .insertOne(this);
    }

    addToCart(product) {
        const index = this.cart.items.findIndex(i => i.productId.toString() === product._id.toString());
        const cartItems = [...this.cart.items];

        if (index > -1) {
            cartItems[index].quantity = cartItems[index].quantity + 1;
        } else {
            cartItems.push({ productId: product._id, quantity: 1 });
        }
        return db.getDbInstance()
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: { items: cartItems } } }
            );
    }

    deleteFromCart(id) {
        const items = this.cart.items.filter(i => i.productId.toString() !== id.toString());
        return db.getDbInstance()
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: { items } } }
            );
    }

    getCart() {
        const ids = this.cart.items.map(item => item.productId);
        return db.getDbInstance()
            .collection('products')
            .find({ _id: { $in: ids } })
            .toArray()
            .then(products => {
                return products.map(pr => {
                    return {
                        ...pr,
                        quantity: this.cart.items.find(i => i.productId.toString() === pr._id.toString()).quantity
                    }
                });
            });
    }

    static find(id) {
        return db.getDbInstance()
            .collection('users')
            .findOne({ _id: new mongodb.ObjectId(id) });
    }
}

module.exports = User;