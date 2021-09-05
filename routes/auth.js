const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const routes = require('../config')?.routes;

router.get(routes.LOGIN, authController.getLoginPage);

router.post(routes.LOGIN, authController.login);

router.post(routes.LOGOUT, authController.logout);

router.get(routes.SIGNUP, authController.getSignupPage);

router.post(routes.SIGNUP, authController.signup);

module.exports = router;