const Cart = require('../models/cart');
const db = require('../util/db');

module.exports = class Product {

    constructor({ title, imageUrl, description, price }) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    create() {
        return db.query(
            'INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)',
            [this.title, this.imageUrl, this.description, this.price]
        );
    }

    static update({ id, title, price, imageUrl, description }) {
        return db.query(
            'UPDATE products SET title = ?, imageUrl = ?, description = ?, price = ? WHERE productID = ?',
            [title, imageUrl, description, price, id]
        );
    }

    static delete(id) {
        return Promise.all([
            db.query('DELETE from products WHERE productID = ?', [id]),
            Cart.deleteProduct(id)
        ]);
    }

    static fetchAll() {
        return db.query(`SELECT * FROM products`);
    }

    static getProduct(id) {
        return db.query('SELECT * FROM products WHERE productID = ?', [id]);
    }
}