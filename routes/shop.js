const express = require('express');
const admin = require('./admin');

const router = express.Router();
const config = require('../config');

router.get('/', (req, res) => {
    res.render(config?.pages?.shop?.view, {
        config,
        products: admin?.products,
        path: config?.pages?.shop?.fullRoute,
        pageTitle: config?.pages?.shop?.pageTitle
    });
});

module.exports = router;