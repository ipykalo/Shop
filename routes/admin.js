const express = require('express');
const router = express.Router();

const config = require('../config');
const productsController = require('../controllers/products');

router.get(config?.pages?.addProduct?.route, productsController.getAddProduct);

router.post(config?.pages?.addProduct?.route, productsController.postAddProduct);

module.exports = router;