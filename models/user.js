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

    addOrder() {
        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: new mongodb.ObjectId(this._id),
                        name: this.name
                    }
                }
                return db.getDbInstance()
                    .collection('orders')
                    .insertOne(order)
            })
            .then(() => {
                this.cart = { items: [] };
                return db.getDbInstance()
                    .collection('users')
                    .updateOne(
                        { _id: new mongodb.ObjectId(this._id) },
                        { $set: { cart: this.cart } }
                    );
            });
    }

    getOrders() {
        return db.getDbInstance()
            .collection('orders')
            .find({ 'user._id': new mongodb.ObjectId(this._id) })
            .toArray();
    }

    deleteFromOrder(productId) {
        return db.getDbInstance()
            .collection('orders')
            .find({ 'user._id': new mongodb.ObjectId(this._id) })
            .toArray()
            .then(orders => {
                orders.forEach(order => {
                    order.items.forEach((pr, i, arr) => {
                        if (pr._id.toString() === productId.toString()) {
                            arr.splice(i, 1);
                        }
                    });
                    if (!order.items.length) {
                        return db.getDbInstance()
                            .collection('orders')
                            .deleteOne({ _id: new mongodb.ObjectId(order._id) });
                    }
                    return db.getDbInstance()
                        .collection('orders')
                        .updateOne({ _id: new mongodb.ObjectId(order._id) },
                            { $set: { items: order.items } }
                        );
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