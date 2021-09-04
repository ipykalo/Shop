const config = require('../config');

exports.getLoginPage = (req, res) => {
    const isLoggedIn = req.get('Cookie').split('=')[1];
    console.log(isLoggedIn)
    res.render(config?.pages?.login?.view, {
        config,
        isLoggedIn: isLoggedIn,
        path: config?.pages?.login.route,
        pageTitle: config?.pages?.login.pageTitle
    });
}

exports.login = (req, res) => {
    res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    res.redirect('/');
}