const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const routes = require('../config')?.routes;
const protectRoutes = require('../middleware/protect-routes');

router.get(routes.ADMIN_ADD_PRODUCT, protectRoutes, adminController.getCreateProductForm);

router.post(routes.ADMIN_ADD_PRODUCT, protectRoutes, adminController.createProduct);

router.get(routes.ADMIN_EDIT_PRODUCT_ID, protectRoutes, adminController.editProduct);

router.post(routes.ADMIN_EDIT_PRODUCT, protectRoutes, adminController.updateProduct);

router.get(routes.ADMIN_PRODUCTS, protectRoutes, adminController.getProducts);

router.get(routes.ADMIN_DELETE_PRODUCT_ID, protectRoutes, adminController.deleteProduct);

module.exports = router;