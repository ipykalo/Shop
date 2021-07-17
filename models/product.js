const fs = require('fs');
const helper = require('../util/helper');
const Cart = require('../models/cart');

module.exports = class Product {

    constructor({ title, imageUrl, description, price }) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price
    }

    create() {
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

    static update(product, cb) {
        if (typeof cb !== 'function') {
            return;
        }
        try {
            const path = helper.getPath('data', 'products.json');
            fs.readFile(path, (error, fileContent) => {
                if (error || !fileContent?.length) {
                    return cb(null);
                }
                const products = JSON.parse(fileContent);
                const index = products?.findIndex(pr => pr?.id === product?.id);
                if (index === -1) {
                    return cb(null);
                }
                products[index] = product;
                
                fs.writeFile(path, JSON.stringify(products), err => {
                    if (!err) {
                        return cb(product);
                    }
                    cb(null);
                });
            });
        } catch (err) {
            console.log(err);
            cb(null);
        }
    }

    static delete(id, cb) {
        if (typeof cb !== 'function') {
            return;
        }
        try {
            const path = helper.getPath('data', 'products.json');
            fs.readFile(path, (error, fileContent) => {
                if (error || !fileContent?.length) {
                    return cb(null);
                }
                const products = JSON.parse(fileContent);
                const product = products.find(pr => pr.id === id);
                product && Cart.deleteProduct(id, product.price);
                const filteredProducts = products?.filter(pr => pr?.id !== id);

                fs.writeFile(path, JSON.stringify(filteredProducts), err => {
                    if (!err) {
                        return cb(id);
                    }
                    cb(null);
                });
            });
        } catch (err) {
            console.log(err);
            cb(null);
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
                    return cb([]);
                }
                cb(JSON.parse(fileContent));
            });
        } catch (err) {
            console.log(err);
            cb([]);
        }
    }

    static getProduct(id, cb) {
        if (typeof cb !== 'function') {
            return;
        }
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