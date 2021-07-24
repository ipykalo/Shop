const config = require('../config');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(([rows]) => {
            if (rows) {
                res.render(config?.pages?.productList?.view, {
                    config,
                    products: rows,
                    path: config?.pages?.productList?.route,
                    pageTitle: config?.pages?.productList?.pageTitle
                });
            }
        })
        .catch(err => console.log(err, 'getProducts'));
}

exports.getProduct = (req, res) => {
    Product.getProduct(req.params.id)
        .then(([rows]) => {
            res.render(config?.pages?.productDetail?.view, {
                config,
                product: rows[0],
                path: config?.routes.PRODUCTS,
                pageTitle: config?.pages?.productDetail?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getProduct'));
}

exports.getIndex = (req, res) => {
    Product.fetchAll()
        .then(([rows]) => {
            if (rows) {
                res.render(config?.pages?.index?.view, {
                    config,
                    products: rows,
                    path: config?.pages?.index?.route,
                    pageTitle: config?.pages?.index?.pageTitle
                });
            }
        })
        .catch(err => console.log(err, 'getIndex'));
}

exports.getCart = (req, res) => {
    Cart.getCart()
        .then(cart => {
            res.render(config?.pages?.cart?.view, {
                config,
                products: cart.products,
                path: config?.pages?.cart?.route,
                pageTitle: config?.pages?.cart?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getcart'));
}

exports.addToCart = (req, res) => {
    Cart.add(req?.body?.id)
        .then(() => res.redirect(config.routes.CART))
        .catch(err => console.log(err, 'getProduct'));
}

exports.deleteFromCart = (req, res) => {
    Cart.delete(req?.body?.id)
        .then(() => res.redirect(config.routes.CART))
        .catch(err => console.log(err, 'deleteFromCart'));
}

exports.getCheckout = (req, res) => {
    res.render(config?.pages?.checkout?.view, {
        config,
        path: config?.pages?.checkout?.route,
        pageTitle: config?.pages?.checkout?.pageTitle
    });
}

exports.getOrders = (req, res) => {
    res.render(config?.pages?.orders?.view, {
        config,
        path: config?.pages?.orders?.route,
        pageTitle: config?.pages?.orders?.pageTitle
    });
}