const path = require('path');
const nodemailer = require('nodemailer');

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