const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports.getPath = (...paths) => path.join(path.dirname(require.main.filename), ...paths);

module.exports.getMailTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: 'ivandevtestacc@gmail.com',
            pass: 'Qaz!12457800'
        }
    });
}

module.exports.logError = (err, method) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    console.log(`------${method}------`, err);
    return error;
}

module.exports.isImage = (mimetype) => {
    if (!mimetype) {
        return false;
    }
    return ['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype);
}

module.exports.deleteFile = (url) => {
    fs.unlink(url, err => {
        if (err) {
            throw this.logError(err, 'deleteFile');
        }
    });
}