const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const routes = require('../config')?.routes;

router.get(routes.ADMIN_ADD_PRODUCT, adminController.getCreateProductForm);

router.post(routes.ADMIN_ADD_PRODUCT, adminController.createProduct);

router.get(routes.ADMIN_EDIT_PRODUCT_ID, adminController.editProduct);

router.post(routes.ADMIN_EDIT_PRODUCT, adminController.updateProduct);

router.get(routes.ADMIN_PRODUCTS, adminController.getProducts);

router.get(routes.ADMIN_DELETE_PRODUCT_ID, adminController.deleteProduct);

module.exports = router;