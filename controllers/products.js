const config = require('../config');
const products = [];

module.exports.getAddProduct = (req, res) => {
    res.render(config?.pages?.addProduct?.view, {
        config,
        path: config?.pages?.addProduct?.fullRoute,
        pageTitle: config?.pages?.addProduct?.pageTitle
    });
}

module.exports.postAddProduct = (req, res) => {
    products.push({ title: req.body.title });
    res.redirect('/');
}

module.exports.getProducts = (req, res) => {
    res.render(config?.pages?.shop?.view, {
        config,
        products: products,
        path: config?.pages?.shop?.fullRoute,
        pageTitle: config?.pages?.shop?.pageTitle
    });
}