const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const MONGO_DB_DRIVER = 'mongodb+srv://ipyka:hV2VuDQK9NoUEQGI@cluster0.buupe.mongodb.net/shop';
const SECRET_SESSION_KEY = 'secret-santa';

const app = express();
const store = new MongoDbStore({
    uri: MONGO_DB_DRIVER,
    collection: 'sessions'
});

const helper = require('./util/helper');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
const config = require('./config');

/**
 * Dynamic templating engin (pug) configuration
 * To render file use this res.render('shop')
 */
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(helper.getPath('public'))); //Serving static files (CSS)
app.use('/images', express.static(helper.getPath('images'))); //Serving static files (images)

app.use(session({
    store,
    secret: SECRET_SESSION_KEY,
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

mongoose.connect(MONGO_DB_DRIVER)
    .then(() => app.listen(3000, () => console.log("Server is runing!")))
    .catch(err => console.log(err, 'db connection'));