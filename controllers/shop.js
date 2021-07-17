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
    Product.fetchAll(products => {
        res.render(config?.pages?.index?.view, {
            config,
            products: products,
            path: config?.pages?.index?.route,
            pageTitle: config?.pages?.index?.pageTitle
        });
    });
}

exports.getCart = (req, res) => {
    const render = {
        config,
        products: [],
        path: config?.pages?.cart?.route,
        pageTitle: config?.pages?.cart?.pageTitle
    }
    Cart.getCart(cart => {
        if (!cart || !cart.products.length) {
            return res.render(config?.pages?.cart?.view, render);
        }
        Product.fetchAll(products => {
            const filtered = [];
            cart.products.forEach(item => {
                products.forEach(pr => {
                    if (pr.id === item.id) {
                        filtered.push({ ...pr, quantity: item.quantity })
                    }
                });
            });
            render.products = filtered;
            res.render(config?.pages?.cart?.view, render);
        });
    });
}

exports.addToCart = (req, res) => {
    Product.getProduct(req?.body?.id, product => {
        Cart.add(req?.body?.id, product?.price);
        res.redirect(config.routes.CART);
    });
}

exports.deleteFromCart = (req, res) => {
    Product.getProduct(req?.body?.id, product => {
        Cart.delete(req?.body?.id, product?.price);
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