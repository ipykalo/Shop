const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const routes = require('../config')?.routes;

router.get(routes.LOGIN, authController.getLoginPage);

router.post(routes.LOGIN, authController.login);

router.post(routes.LOGOUT, authController.logout);

router.get(routes.SIGNUP, authController.getSignupPage);

router.post(routes.SIGNUP, authController.signup);

router.get(routes.RESET_PASSWORD, authController.getResetPassPage);

router.post(routes.RESET_PASSWORD, authController.resetPassword);

module.exports = router;