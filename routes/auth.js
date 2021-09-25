const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const routes = require('../config')?.routes;
const { check } = require('express-validator');

router.get(routes.LOGIN, authController.getLoginPage);

router.post(routes.LOGIN, authController.login);

router.post(routes.LOGOUT, authController.logout);

router.get(routes.SIGNUP, authController.getSignupPage);

router.post(
    routes.SIGNUP,
    check('email').isEmail().withMessage('Please enter a valid email.'),
    check('password').custom(value => {
        const pattern = /^(?=.{6,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
        if (!pattern.test(value)) {
            throw new Error(
                'Password requires: at least 6 characters, at least one lowercase char, at least one uppercase char, at least one digit, at least one symbol.'
            );
        }
        return true
    }),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Confirm Password does not match password');
        }
        return true
    }),
    authController.signup
);

router.get(routes.RESET_PASSWORD, authController.getResetPassPage);

router.post(routes.RESET_PASSWORD, authController.resetPassword);

router.get(routes.RESET_PASSWORD_TOKEN, authController.getNewPassPage);

router.post(routes.NEW_PASSWORD, authController.setNewPassword);

module.exports = router;