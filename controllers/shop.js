const config = require('../config');
const Product = require('../models/product');

exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.render(config?.pages?.productList?.view, {
                config,
                products: products,
                path: config?.pages?.productList?.route,
                pageTitle: config?.pages?.productList?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getProducts'));
}

exports.getProduct = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            res.render(config?.pages?.productDetail?.view, {
                config,
                product: product,
                path: config?.routes.PRODUCTS,
                pageTitle: config?.pages?.productDetail?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getProduct'));
}

exports.getIndex = (req, res) => {
    Product.find()
        .then(products => {
            res.render(config?.pages?.index?.view, {
                config,
                products: products,
                path: config?.pages?.index?.route,
                pageTitle: config?.pages?.index?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getProducts'));
}

exports.getCart = (req, res) => {
    req.user.getCart()
        .then(products => {
            res.render(config?.pages?.cart?.view, {
                config,
                products: products,
                path: config?.pages?.cart?.route,
                pageTitle: config?.pages?.cart?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getCart'))
}

exports.addToCart = (req, res) => {
    Product.fetchOne(req.body.id)
        .then(product => req.user.addToCart(product))
        .then(() => res.redirect(config.routes.CART))
        .catch(err => console.log(err, 'addToCart'));
}

exports.deleteFromCart = (req, res) => {
    req.user.deleteFromCart(req?.body?.id)
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
    req.user.getOrders()
        .then(orders => {
            res.render(config?.pages?.orders?.view, {
                config,
                orders,
                path: config?.pages?.orders?.route,
                pageTitle: config?.pages?.orders?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getOrders'));
}

exports.createOrder = (req, res) => {
    req.user.addOrder()
        .then(() => res.redirect(config.routes.ORDERS))
        .catch(err => console.log(err, 'createOrder'));
}