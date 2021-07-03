const express = require('express');
const helper = require('../util/helper');

const router = express.Router();

router.get('/add-product', (req, res) => res.sendFile(helper.getPath('views', 'add-product.html')));

router.post('/add-product', (req, res) => {
    res.redirect('/');
});

module.exports = router;