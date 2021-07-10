const config = require('../config');
const Product = require('../models/product');

exports.getCreateProductForm = (req, res) => {
    res.render(config?.pages?.addProduct?.view, {
        config,
        path: config?.pages?.addProduct?.route,
        pageTitle: config?.pages?.addProduct?.pageTitle
    });
}

exports.createProduct = (req, res) => {
    const product = new Product({
        title: req?.body?.title,
        imageUrl: req?.body?.imageUrl,
        description: req?.body?.description,
        price: req?.body?.price
    });
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res) => {
    Product.fetchAll((products => {
        res.render(config?.pages?.products?.view, {
            config,
            products: products,
            path: config?.pages?.products?.route,
            pageTitle: config?.pages?.products?.pageTitle
        });
    }));
}