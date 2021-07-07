const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');
const config = require('../config');

router.get(config?.pages?.shop?.route, productsController.getProducts);

module.exports = router;