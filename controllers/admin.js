const config = require('../config');
const { validationResult } = require('express-validator');
const Product = require('../models/product');
const Order = require('../models/order');
const helper = require('../util/helper');

exports.getCreateProductForm = (req, res) => {
    res.render(config?.pages?.addProduct?.view, {
        config,
        path: config?.pages?.addProduct?.route,
        pageTitle: config?.pages?.addProduct?.pageTitle,
        oldInput: {
            title: '',
            imageUrl: '',
            description: '',
            price: ''
        }
    });
}

exports.createProduct = (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length) {
        return res.status(422).render(config?.pages?.addProduct?.view, {
            config,
            path: config?.pages?.addProduct.route,
            pageTitle: config?.pages?.addProduct.pageTitle,
            errors: errors,
            oldInput: {
                title: req?.body?.title,
                imageUrl: req?.body?.imageUrl,
                description: req?.body?.description,
                price: req?.body?.price
            }
        });
    }
    new Product({
        title: req?.body?.title,
        imageUrl: req?.body?.imageUrl,
        description: req?.body?.description,
        price: req?.body?.price,
        userId: req?.session?.user?._id
    })
        .save()
        .then(() => res.redirect(config.routes.INDEX))
        .catch(err => next(helper.logError(err, 'createProduct')));
}

exports.editProduct = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            res.render(config?.pages?.editProduct?.view, {
                config,
                product: product,
                path: config?.pages?.editProduct?.route,
                pageTitle: config?.pages?.editProduct?.pageTitle
            });
        })
        .catch(err => next(helper.logError(err, 'editProduct')));
}

exports.updateProduct = (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length) {
        return res.status(422).render(config?.pages?.editProduct?.view, {
            config,
            path: config?.pages?.editProduct.route,
            pageTitle: config?.pages?.editProduct.pageTitle,
            errors: errors,
            product: {
                title: req?.body?.title,
                imageUrl: req?.body?.imageUrl,
                description: req?.body?.description,
                price: req?.body?.price,
                _id: req.body.id
            }
        });
    }
    Product.updateOne({ _id: req.body.id, userId: req.user._id }, {
        title: req?.body?.title,
        price: req?.body?.price,
        imageUrl: req?.body?.imageUrl,
        description: req?.body?.description
    })
        .then(() => res.redirect(config.routes.ADMIN_PRODUCTS))
        .catch(err => next(helper.logError(err, 'updateProduct')));
}

exports.deleteProduct = (req, res, next) => {
    Product
        .deleteOne({ _id: req.params.id, userId: req.user._id })
        .then(({ deletedCount }) => {
            if (deletedCount === 0) {
                return;
            }
            return Order.find({ 'user.userId': req.user._id })
                .then(orders => {
                    for (let i = 0; i < orders.length; i++) {
                        orders[i].products.forEach((item, index, arr) => {
                            if (item.product._id.toString() === req.params.id.toString()) {
                                arr.splice(index, 1);
                            }
                        });
                        if (!orders[i].products.length) {
                            orders.splice(i, 1);
                            --i;
                        }
                    }
                    return Order.collection.drop()
                        .then(() => Order.insertMany(orders));
                });
        })
        .then(() => res.redirect(config.routes.ADMIN_PRODUCTS))
        .catch(err => next(helper.logError(err, 'deleteProduct')));
}

exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
        .then(products => {
            res.render(config?.pages?.products?.view, {
                config,
                products: products,
                path: config?.pages?.products?.route,
                pageTitle: config?.pages?.products?.pageTitle
            });
        })
        .catch(err => next(helper.logError(err, 'getProducts')));
}