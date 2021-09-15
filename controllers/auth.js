const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../models/user');

exports.getLoginPage = (req, res) => {
    res.render(config?.pages?.login?.view, {
        config,
        path: config?.pages?.login.route,
        pageTitle: config?.pages?.login.pageTitle
    });
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password!');
                return res.redirect(config.routes.LOGIN);
            }
            return bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        req.flash('error', 'Invalid email or password!');
                        return res.redirect(config.routes.LOGIN);
                    }
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.save(() => res.redirect('/'));
                });
        })
        .catch(err => console.log(err, 'login'));
}

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/'));
}

exports.getSignupPage = (req, res) => {
    res.render(config?.pages?.signup?.view, {
        config,
        path: config?.pages?.signup.route,
        pageTitle: config?.pages?.signup.pageTitle
    });
}

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                req.flash('error', 'A user with the email already exists!');
                return res.redirect(config.routes.SIGNUP);
            }
            return bcrypt.hash(req.body.password, 12)
                .then(hashedPassword => {
                    return new User({
                        email: req.body.email,
                        password: hashedPassword,
                        cart: { items: [] }
                    })
                        .save()
                        .then(() => res.redirect(config.routes.LOGIN))
                });
        })
        .catch(err => console.log(err, 'signup'));
}