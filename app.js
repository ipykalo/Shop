const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const scrf = require('csurf');

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
const csrf = require('csurf');
/**
 * Dynamic templating engin (pug) configuration
 * To render file use this res.render('shop')
 */
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(helper.getPath('public'))); //Serving static files (CSS)
app.use(session({
    store,
    secret: SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err, 'FindUser'));
});

//csrf token protection that will be added to every request
app.use(csrf());

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.scrfToken = req.csrfToken();
    next();
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.getNoteFoundPage);

mongoose.connect(MONGO_DB_DRIVER)
    .then(() => app.listen(3000, () => console.log("Server is runing!")))
    .catch(err => console.log(err, 'db connection'));