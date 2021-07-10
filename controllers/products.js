const config = require('../config');
const Product = require('../models/product');

module.exports.getCreateProductForm = (req, res) => {
    res.render(config?.pages?.addProduct?.view, {
        config,
        path: config?.pages?.addProduct?.fullRoute,
        pageTitle: config?.pages?.addProduct?.pageTitle
    });
}

module.exports.createProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

module.exports.getProducts = (req, res) => {
    Product.fetchAll((products => {
        res.render(config?.pages?.shop?.view, {
            config,
            products: products,
            path: config?.pages?.shop?.fullRoute,
            pageTitle: config?.pages?.shop?.pageTitle
        });
    }));
}