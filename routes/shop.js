const express = require('express');
const helper = require('../util/helper');
const admin = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
    //res.sendFile(helper.getPath('views', 'shop.html'))
    res.render('shop', { products: admin?.products, pageTitle: 'Shop' });
});

module.exports = router;