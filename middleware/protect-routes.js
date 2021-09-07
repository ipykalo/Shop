const config = require('../config');

module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect(config.routes.LOGIN);
    }
    next();
}