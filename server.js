const express = require('express');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const fs = require('fs');
const path = require('path');
const https = require('https');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const store = new MongoDbStore({
    uri: process.env.MONGO_DB_DRIVER,
    collection: 'sessions'
});

const helper = require('./util/helper');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

/**
 * Dynamic templating engin (pug) configuration
 * To render file use this res.render('shop')
 */
app.set('view engine', 'pug');
app.set('views', 'views');

//Helmet helps to secure Express apps by setting various HTTP headers.
app.use(helmet());
// The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.
app.use(compression());

app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(helper.getPath('public'))); //Serving static files (CSS, JS)
app.use('/images', express.static(helper.getPath('images'))); //Serving static files (images)

app.use(session({
    store,
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 3600000),
        maxAge: 3600000
    }
}));

app.use(
    multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'images');
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix);
            }
        }),
        fileFilter: (req, file, cb) => {
            helper.isImage(file.mimetype) ? cb(null, true) : cb(null, false);
        }
    })
        .single('image')
);

//csrf token protection that will be added to every request
app.use(csrf());
//save error messages to the session
app.use(flash());

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.scrfToken = req.csrfToken();
    res.locals.errors = req.flash('error');
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => next(helper.logError(err, 'Unable to set user to the request (App.js)')));
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.getNoteFoundPage);

app.use((error, req, res, next) => {
    console.log(error, 'error')
    res.render(config?.pages?.error?.view, {
        config,
        message: error?.message || '',
        path: config?.pages?.error?.route,
        pageTitle: config?.pages?.error?.pageTitle,
    });
});

mongoose.connect(process.env.MONGO_DB_DRIVER)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => console.log("Server is runing!"))
        // https.createServer({
        //     key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
        //     cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
        // }, app)
        //     .listen(process.env.PORT || 3000, () => console.log(`Server is runing on the port: ${process.env.PORT}`));
    })
    .catch(err => console.log(err, 'DB connection failed!'));