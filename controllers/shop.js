const config = require('../config');
const Product = require('../models/product');
const Order = require('../models/order');
const helper = require('../util/helper');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render(config?.pages?.productList?.view, {
                config,
                products: products,
                path: config?.pages?.productList?.route,
                pageTitle: config?.pages?.productList?.pageTitle
            });
        })
        .catch(err => next(helper.logError(err, 'getProducts')));
}

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            res.render(config?.pages?.productDetail?.view, {
                config,
                product: product,
                path: config?.routes.PRODUCTS,
                pageTitle: config?.pages?.productDetail?.pageTitle
            });
        })
        .catch(err => next(helper.logError(err, 'getProduct')));
}

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render(config?.pages?.index?.view, {
                config,
                products: products,
                path: config?.pages?.index?.route,
                pageTitle: config?.pages?.index?.pageTitle
            });
        })
        .catch(err => next(helper.logError(err, 'getIndex')));
}

exports.getCart = (req, res, next) => {
    req.user.populate('cart.items.productId')
        .then(products => {
            res.render(config?.pages?.cart?.view, {
                config,
                products: products.cart.items,
                path: config?.pages?.cart?.route,
                pageTitle: config?.pages?.cart?.pageTitle
            });
        })
        .catch(err => next(helper.logError(err, 'getCart')));
}

exports.addToCart = (req, res, next) => {
    Product.findById(req.body.id)
        .then(product => req.user.addToCart(product))
        .then(() => res.redirect(config.routes.CART))
        .catch(err => next(helper.logError(err, 'addToCart')));
}

exports.deleteFromCart = (req, res, next) => {
    req.user.deleteFromCart(req?.body?.id)
        .then(() => res.redirect(config.routes.CART))
        .catch(err => next(helper.logError(err, 'deleteFromCart')));
}

exports.getCheckout = (req, res) => {
    res.render(config?.pages?.checkout?.view, {
        config,
        path: config?.pages?.checkout?.route,
        pageTitle: config?.pages?.checkout?.pageTitle
    });
}

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render(config?.pages?.orders?.view, {
                config,
                orders,
                path: config?.pages?.orders?.route,
                pageTitle: config?.pages?.orders?.pageTitle
            });
        })
        .catch(err => next(helper.logError(err, 'getOrders')));
}

exports.createOrder = (req, res, next) => {
    req.user.populate('cart.items.productId')
        .then(cartProducts => {
            const products = cartProducts.cart.items.map(i => ({ product: { ...i.productId._doc }, quantity: i.quantity }));
            new Order({
                products,
                user: {
                    name: req.user.name,
                    userId: req.user._id
                }
            })
                .save()
        })
        .then(() => req.user.clearCart())
        .then(() => res.redirect(config.routes.ORDERS))
        .catch(err => next(helper.logError(err, 'createOrder')));
}