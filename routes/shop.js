const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');
const routes = require('../config')?.routes;

router.get(routes.INDEX, shopController.getIndex);

router.get(routes.PRODUCTS, shopController.getProducts);

router.get(routes.PRODUCT_DETAIL_ID, shopController.getProduct);

router.get(routes.CART, shopController.getCart);

router.get(routes.CHECKOUT, shopController.getCheckout);

router.get(routes.ORDERS, shopController.getOrders);

module.exports = router;