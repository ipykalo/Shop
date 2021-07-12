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
            this.id = Math.random().toString();
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

    static update(product, cb = () => { }) {
        try {
            const path = helper.getPath('data', 'products.json');
            fs.readFile(path, (error, fileContent) => {
                if (error || !fileContent?.length) {
                    return cb(null);
                }
                const products = JSON.parse(fileContent);
                const index = products?.findIndex(pr => pr?.id === product?.id);
                if (index === -1) {
                    cb(null);
                }
                products[index] = product;
                fs.writeFile(path, JSON.stringify(products), err => {
                    if (!err) {
                        cb(product);
                    }
                    cb(null);
                });
            });
        } catch (err) {
            console.log(err);
            cb(null);
        }
    }

    static fetchAll(cb = () => { }) {
        try {
            const path = helper.getPath('data', 'products.json');
            fs.readFile(path, (error, fileContent) => {
                if (error || !fileContent?.length) {
                    return cb([]);
                }
                const products = JSON.parse(fileContent);
                cb(products);
            });
        } catch (err) {
            console.log(err);
            cb([]);
        }
    }

    static getProduct(id, cb = () => { }) {
        try {
            const path = helper.getPath('data', 'products.json');
            fs.readFile(path, (error, fileContent) => {
                if (error || !fileContent?.length) {
                    return cb({});
                }
                const product = JSON.parse(fileContent)?.find(item => item?.id === id);
                cb(product || {});
            });
        } catch (err) {
            console.log(err);
            cb([]);
        }
    }
}