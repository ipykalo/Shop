const config = require('../config');

exports.getLoginPage = (req, res) => {
    console.log(req.session.loggedIn)
    res.render(config?.pages?.login?.view, {
        config,
        isLoggedIn: false,
        path: config?.pages?.login.route,
        pageTitle: config?.pages?.login.pageTitle
    });
}

exports.login = (req, res) => {
    req.session.loggedIn = true;
    res.redirect('/');
}