const config = require('../config');

module.exports.getNoteFoundPage = (req, res) => {
    res.status(404).render(config?.pages?.notFound?.view, {
        config,
        pageTitle: config?.pages?.notFound?.pageTitle
    });
}