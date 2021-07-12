const fs = require('fs');
const helper = require('../util/helper');

module.exports = class Cart {
    static addProduct(id, price) {
        if (!id || !price) {
            return;
        }
        try {
            const path = helper.getPath('data', 'cart.json');
            fs.readFile(path, (error, cartData) => {
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
}