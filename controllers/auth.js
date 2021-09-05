const config = require('../config');
const User = require('../models/user');

exports.getLoginPage = (req, res) => {
    res.render(config?.pages?.login?.view, {
        config,
        path: config?.pages?.login.route,
        pageTitle: config?.pages?.login.pageTitle,
        isLoggedIn: req.session.isLoggedIn
    });
}

exports.login = (req, res) => {
    User.findById('6134a1bba797d4a3f60c2596')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(() => res.redirect('/'));
        })
        .catch(err => console.log(err, 'login'));
}

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/'));
}