const db = require('../util/db');

module.exports = class Cart {
    static add(id) {
        return db.query('INSERT INTO cart (productID) VALUES (?)', [id]);
    }

    static delete(id) {
        return db.query('DELETE FROM cart WHERE cart.productID = ? LIMIT 1', [id]);
    }

    static deleteProduct(id) {
        return db.query('DELETE FROM cart WHERE cart.productID = ?', [id]);
    }

    static getCart() {
        return db.query('SELECT * FROM products INNER JOIN cart ON products.productID = cart.productID')
            .then(([rows]) => {
                const cart = { products: [], totalPrice: 0 };
                if (!rows?.length) {
                    return cart;
                }
                return rows?.reduce((acc, current) => {
                    const index = acc.products.findIndex(pr => pr.productID === current.productID);
                    if (index === -1) {
                        acc.totalPrice += current.price;
                        acc.products.push({ ...current, quantity: 1 });
                        return acc;
                    }
                    acc.products[index].quantity += 1;
                    acc.totalPrice += current.price;
                    return acc;
                }, cart);
            });
    }
}