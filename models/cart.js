const fs = require('fs');
const helper = require('../util/helper');

module.exports = class Cart {
    static add(id, price) {
        if (!id || !price) {
            return;
        }
        try {
            const path = helper.getPath('data', 'cart.json');
            fs.readFile(path, (error, cartData) => {
                if (error) {
                    return;
                }
                const cart = cartData?.length ? JSON.parse(cartData) : { products: [], totalPrice: 0 };
                let product = cart?.products?.find(pr => pr?.id === id);
                if (!product) {
                    product = { id, quantity: 1 };
                    cart?.products?.push(product);
                } else {
                    ++product.quantity;
                }
                cart.totalPrice += +price;

                fs.writeFile(path, JSON.stringify(cart), err => console.log(err, 'addProduct'));
            });
        } catch (err) {
            console.log(err);
        }
    }

    static delete(id, price) {
        if (!id || !price) {
            return;
        }
        try {
            const path = helper.getPath('data', 'cart.json');
            fs.readFile(path, (error, cartData) => {
                if (!error && cartData?.length) {
                    const cart = JSON.parse(cartData);
                    for (let i = 0; i < cart.products.length; i++) {
                        const product = cart.products[i];
                        if (product && product.id === id) {
                            if (product.quantity > 1) {
                                product.quantity -= 1;
                                cart.totalPrice -= price;
                            } else if (product.quantity === 1) {
                                cart.products.splice(i, 1);
                                cart.totalPrice -= price;
                            }
                            break;
                        }
                    }
                    fs.writeFile(path, JSON.stringify(cart), err => console.log(err, 'delete'));
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    static deleteProduct(id, price) {
        if (!id || !price) {
            return;
        }
        try {
            const path = helper.getPath('data', 'cart.json');
            fs.readFile(path, (error, cartData) => {
                if (!error && cartData?.length) {
                    const cart = JSON.parse(cartData);
                    const product = cart.products.find(pr => pr.id === id);
                    if (!product) {
                        return;
                    }
                    cart.totalPrice -= product.quantity * price;
                    cart.products = cart.products.filter(pr => pr.id !== id);

                    fs.writeFile(path, JSON.stringify(cart), err => console.log(err, 'delete'));
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    static getCart(cb) {
        if (typeof cb !== 'function') {
            return;
        }
        try {
            const path = helper.getPath('data', 'cart.json');
            fs.readFile(path, (error, cartData) => {
                if (error) {
                    return cb(null);
                }
                cb(JSON.parse(cartData));
            });
        } catch (err) {
            console.log(err);
        }
    }
}