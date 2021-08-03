const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');
const routes = require('../config')?.routes;

router.get(routes.INDEX, shopController.getIndex);

router.get(routes.PRODUCTS, shopController.getProducts);

router.get(routes.PRODUCT_DETAIL_ID, shopController.getProduct);

router.get(routes.CART, shopController.getCart);

router.post(routes.CART, shopController.addToCart);

router.post(routes.DELETE_FROM_CART, shopController.deleteFromCart);

router.get(routes.CHECKOUT, shopController.getCheckout);

router.get(routes.ORDERS, shopController.getOrders);

router.post(routes.CREATE_ORDER, shopController.createOrder);

module.exports = router;