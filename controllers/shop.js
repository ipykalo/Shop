const config = require('../config');
const Product = require('../models/product');

exports.getProducts = (req, res) => {
    Product.fetchAll((products => {
        res.render(config?.pages?.productList?.view, {
            config,
            products: products,
            path: config?.pages?.productList?.route,
            pageTitle: config?.pages?.productList?.pageTitle
        });
    }));
}

exports.getIndex = (req, res) => {
    Product.fetchAll((products => {
        res.render(config?.pages?.index?.view, {
            config,
            products: products,
            path: config?.pages?.index?.route,
            pageTitle: config?.pages?.index?.pageTitle
        });
    }));
}

exports.getCart = (req, res) => {
    res.render(config?.pages?.cart?.view, {
        config,
        path: config?.pages?.cart?.route,
        pageTitle: config?.pages?.cart?.pageTitle
    });
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