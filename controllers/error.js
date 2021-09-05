const config = require('../config');

exports.getNoteFoundPage = (req, res) => {
    res.status(404)
        .render(config?.pages?.notFound?.view, {
            config,
            path: config?.pages?.notFound?.route,
            pageTitle: config?.pages?.notFound?.pageTitle,
            isLoggedIn: req.session.isLoggedIn
        });
}