const db = require('../util/db');

class Product {

    constructor({ title, imageUrl, description, price }) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.getDbInstance().collection('products').insertOne(this);
    }

    static fetchAll() {
        return db.getDbInstance().collection('products').find().toArray();
    }

    static fetchOne(_id) {
        console.log(_id, 'id')
        return db.getDbInstance().collection('products').find({ _id }).next();
    }
}

module.exports = Product;