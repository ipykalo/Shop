const express = require('express');
const helper = require('../util/helper');
const router = express.Router();

const products = [];

router.get('/add-product', (req, res) => {
    //res.sendFile(helper.getPath('views', 'add-product.html'));
    res.render('add-product', { pageTitle: 'Add Product' });
});

router.post('/add-product', (req, res) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

module.exports = {
    routes: router,
    products: products
}