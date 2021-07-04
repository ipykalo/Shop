const express = require('express');
const router = express.Router();

const config = require('../config');
const products = [];

router.get(config?.pages?.addProduct?.route, (req, res) => {
    res.render(config?.pages?.addProduct?.view, {
        config,
        path: config?.pages?.addProduct?.fullRoute,
        pageTitle: config?.pages?.addProduct?.pageTitle
    });
});

router.post(config?.pages?.addProduct?.route, (req, res) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

module.exports = {
    routes: router,
    products: products
}