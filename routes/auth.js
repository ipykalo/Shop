const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const routes = require('../config')?.routes;
const { check, body } = require('express-validator');
const User = require('../models/user');

router.get(routes.LOGIN, authController.getLoginPage);

router.post(
    routes.LOGIN,
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    authController.login
);

router.post(routes.LOGOUT, authController.logout);

router.get(routes.SIGNUP, authController.getSignupPage);

router.post(
    routes.SIGNUP,
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom(value => {
            return User.findOne({ email: value })
                .then(user => {
                    if (user) {
                        return Promise.reject('A user with the email already exists!');
                    }
                });
        }),
    body('password', 'Length of password should be at least 5 characters.').isLength({ min: 5 }),
    body('confirmPassword').custom((value, { req }) => {
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