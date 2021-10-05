const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');
const routes = require('../config')?.routes;
const protectRoutes = require('../middleware/protect-routes');

router.get(routes.INDEX, shopController.getIndex);

router.get(routes.PRODUCTS, shopController.getProducts);

router.get(routes.PRODUCT_DETAIL_ID, shopController.getProduct);

router.get(routes.CART, protectRoutes, shopController.getCart);

router.post(routes.CART, protectRoutes, shopController.addToCart);

router.post(routes.DELETE_FROM_CART, protectRoutes, shopController.deleteFromCart);

router.get(routes.CHECKOUT, protectRoutes, shopController.getCheckout);

router.get(routes.ORDERS, protectRoutes, shopController.getOrders);

router.post(routes.CREATE_ORDER, protectRoutes, shopController.createOrder);

router.get(routes.INVOICE, protectRoutes, shopController.getInvoice);

module.exports = router;