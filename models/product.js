const db = require('../util/db');
const mongodb = require('mongodb');

class Product {

    constructor({ title, imageUrl, description, price, userId }) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.userId = userId;
    }

    save() {
        return db.getDbInstance()
            .collection('products')
            .insertOne(this);
    }

    static update(product) {
        return db.getDbInstance()
            .collection('products')
            .updateOne(
                { _id: new mongodb.ObjectId(product.id) },
                {
                    $set: {
                        title: product.title,
                        imageUrl: product.imageUrl,
                        description: product.description,
                        price: product.price
                    }
                }
            );
    }

    static delete(id) {
        return db.getDbInstance()
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(id) });
    }

    static fetchAll() {
        return db.getDbInstance()
            .collection('products')
            .find()
            .toArray();
    }

    static fetchOne(_id) {
        return db.getDbInstance()
            .collection('products')
            .find({ _id: new mongodb.ObjectId(_id) })
            .next();
    }
}

module.exports = Product;