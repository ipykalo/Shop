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
    product.create();
    res.redirect(config.routes.INDEX);
}

exports.editProduct = (req, res) => {
    Product.getProduct(req?.params?.id, product => {
        res.render(config?.pages?.editProduct?.view, {
            config,
            product,
            path: config?.pages?.editProduct?.route,
            pageTitle: config?.pages?.editProduct?.pageTitle
        });
    });
}

exports.updateProduct = (req, res) => {
    Product.update({
        id: req?.body?.id,
        title: req?.body?.title,
        price: req?.body?.price,
        imageUrl: req?.body?.imageUrl,
        description: req?.body?.description
    }, product => {
        if (product) {
            return res.redirect(config.routes.ADMIN_PRODUCTS);
        }
        res.send(500, 'Can\'t Update Product');
    });
}

exports.deleteProduct = (req, res) => {
    Product.delete(req?.params?.id, id => {
        if (id) {
            return res.redirect(config.routes.ADMIN_PRODUCTS);
        }
        res.send(500, 'Can\'t Delete Product');
    });
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