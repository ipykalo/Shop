const fs = require('fs');
const helper = require('../util/helper');

module.exports = class Product {

    constructor({ title, imageUrl, description, price }) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price
    }

    save() {
        try {
            const path = helper.getPath('data', 'products.json');
            fs.readFile(path, (error, fileContent) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const fetchedProducts = !fileContent?.length ? [] : JSON.parse(fileContent);
                fetchedProducts.push(this);
                fs.writeFile(path, JSON.stringify(fetchedProducts), (err) => console.log(err));
            });
        } catch (err) {
            console.log(err);
        }
    }

    static fetchAll(cb) {
        if (typeof cb !== 'function') {
            return;
        }
        try {
            const path = helper.getPath('data', 'products.json');
            fs.readFile(path, (error, fileContent) => {
                if (error || !fileContent?.length) {
                    cb([]);
                    return;
                }
                const products = JSON.parse(fileContent);
                cb(products);
            });
        } catch (err) {
            console.log(err);
            cb([]);
        }
    }
}