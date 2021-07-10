const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const routes = require('../config')?.routes;

router.get(routes.ADMIN_ADD_PRODUCT, adminController.getCreateProductForm);

router.post(routes.ADMIN_ADD_PRODUCT, adminController.createProduct);

router.get(routes.ADMIN_PRODUCTS, adminController.getProducts);

module.exports = router;