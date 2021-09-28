const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const config = require('../config');
const User = require('../models/user');
const helper = require('../util/helper');
const { validationResult } = require('express-validator');

exports.getLoginPage = (req, res) => {
    res.render(config?.pages?.login?.view, {
        config,
        path: config?.pages?.login.route,
        pageTitle: config?.pages?.login.pageTitle,
        oldInput: {
            email: '',
            password: ''
        }
    });
}

exports.login = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length) {
        return res.status(422).render(config?.pages?.login?.view, {
            config,
            path: config?.pages?.login.route,
            pageTitle: config?.pages?.login.pageTitle,
            errors: errors,
            oldInput: {
                email: req.body.email,
                password: req.body.password
            }
        });
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(() => res.redirect('/'));
        })
        .catch(err => console.log(err, 'login'));
}

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect(config.routes.LOGIN));
}

exports.getSignupPage = (req, res) => {
    res.render(config?.pages?.signup?.view, {
        config,
        path: config?.pages?.signup.route,
        pageTitle: config?.pages?.signup.pageTitle,
        oldInput: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    });
}

exports.signup = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length) {
        return res.status(422).render(config?.pages?.signup?.view, {
            config,
            path: config?.pages?.signup.route,
            pageTitle: config?.pages?.signup.pageTitle,
            errors: errors,
            oldInput: {
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            }
        });
    }
    bcrypt.hash(req.body.password, 12)
        .then(hashedPassword => {
            return new User({
                email: req.body.email,
                password: hashedPassword,
                cart: { items: [] }
            })
                .save()
                .then(() => res.redirect(config.routes.LOGIN));
        })
        .catch(err => console.log(err, 'signup'));
}

exports.getResetPassPage = (req, res) => {
    res.render(config?.pages?.resetPassword?.view, {
        config,
        path: config?.pages?.resetPassword.route,
        pageTitle: config?.pages?.resetPassword.pageTitle
    });
}

exports.resetPassword = (req, res) => {
    let token;
    crypto.randomBytes(32, (error, buffer) => {
        if (error) {
            req.flash('error', error);
            res.redirect(config.routes.RESET_PASSWORD);
        }
        token = buffer.toString('hex');
    });
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                req.flash('error', 'A user with the email doesn\'t exists!');
                res.redirect(config.routes.RESET_PASSWORD);
            }
            user.resetToken = token;
            user.resetTokenExp = Date.now() + 360000;

            const transporter = helper.getMailTransporter();
            transporter.sendMail({
                from: transporter.options.auth.user,
                to: user.email,
                subject: 'The email was sent from Shop Node.js App',
                text: 'Hello!',
                html: `
                    <h3>You requested a password reset</h3>
                    <p>Click this <a href="http://localhost:3000/reset/${token}"> link to set new password</p>
                `,
            });
            return user.save()
                .then(() => res.redirect(config.routes.LOGIN));
        })
        .catch(err => console.log(err, 'resetPassword'));
}

exports.getNewPassPage = (req, res) => {
    User.findOne({ resetToken: req.params.token, resetTokenExp: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                req.flash('error', 'A reset password token has been expired!');
                return res.redirect(config.routes.LOGIN);
            }
            res.render(config?.pages?.newPassword?.view, {
                config,
                path: config?.pages?.newPassword.route,
                pageTitle: config?.pages?.newPassword.pageTitle,
                userId: user._id,
                resetPassToken: user.resetToken
            });
        });
}

exports.setNewPassword = (req, res) => {
    User.findOne({
        _id: req.body.userId,
        resetToken: req.body.resetPassToken,
        resetTokenExp: { $gt: Date.now() }
    })
        .then(user => {
            if (!user) {
                return req.flash('error', 'The password was not updated!');
            }
            return bcrypt.hash(req.body.password, 12)
                .then(hashedPassword => {
                    user.password = hashedPassword;
                    user.resetToken = null;
                    user.resetTokenExp = null;
                    return user.save()
                        .then(() => {
                            const transporter = helper.getMailTransporter();
                            transporter.sendMail({
                                from: transporter.options.auth.user,
                                to: user.email,
                                subject: 'The email was sent from Shop Node.js App',
                                text: 'Hello!',
                                html: '<h3>Your password has been successfully changed!</h3>',
                            });
                        });
                });
        })
        .then(() => res.redirect(config.routes.LOGIN))
        .catch(err => console.log(err, 'setNewPassword'));
}