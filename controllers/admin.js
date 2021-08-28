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
    new Product({
        title: req?.body?.title,
        imageUrl: req?.body?.imageUrl,
        description: req?.body?.description,
        price: req?.body?.price,
        userId: req.user._id
    })
        .save()
        .then(() => res.redirect(config.routes.INDEX))
        .catch(err => console.log(err, 'createProduct'));
}

exports.editProduct = (req, res) => {
    Product.fetchOne(req.params.id)
        .then(product => {
            res.render(config?.pages?.editProduct?.view, {
                config,
                product: product,
                path: config?.pages?.editProduct?.route,
                pageTitle: config?.pages?.editProduct?.pageTitle
            });
        })
        .catch(err => console.log(err, 'editProduct'));
}

exports.updateProduct = (req, res) => {
    Product.update({
        id: req.body.id,
        title: req?.body?.title,
        price: req?.body?.price,
        imageUrl: req?.body?.imageUrl,
        description: req?.body?.description
    })
        .then(() => res.redirect(config.routes.ADMIN_PRODUCTS))
        .catch(err => console.log(err, 'updateProduct'));
}

exports.deleteProduct = (req, res) => {
    Product.delete(req.params.id)
        .then(() => res.redirect(config.routes.ADMIN_PRODUCTS))
        .catch(err => console.log(err, 'deleteProduct'));
}

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(products => {
            res.render(config?.pages?.products?.view, {
                config,
                products: products,
                path: config?.pages?.products?.route,
                pageTitle: config?.pages?.products?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getProducts'));
}