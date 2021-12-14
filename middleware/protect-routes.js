const config = require('../configs/config');

module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return req.session.destroy(() => res.redirect(config.routes.LOGIN));
    }
    next();
}