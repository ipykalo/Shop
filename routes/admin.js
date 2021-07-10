const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

router.get('/add-product', productsController.getCreateProductForm);

router.post('/add-product', productsController.createProduct);

module.exports = router;