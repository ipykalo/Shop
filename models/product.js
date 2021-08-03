const getDb = require('../util/db').getDb;

class Product {

    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        const db = getDb();
        console.log(db, '----db---')
        return db.createCollection('products', function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    }
}

module.exports = Product;