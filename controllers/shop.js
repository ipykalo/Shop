const config = require('../config');
const Product = require('../models/product');
const Cart = require('../models/cart');

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

exports.getProduct = (req, res) => {
    Product.getProduct(req?.params?.id, (product => {
        res.render(config?.pages?.productDetail?.view, {
            config,
            product,
            path: config?.routes.PRODUCTS,
            pageTitle: config?.pages?.productDetail?.pageTitle
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

exports.addToCart = (req, res) => {
    const id = req?.body?.id;
    Product.getProduct(id, product => {
        Cart.addProduct(id, product?.price);
        res.redirect(config.routes.CART);
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