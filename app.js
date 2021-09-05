const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

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
    User.findById('612e11054eb0ac89758afe0c')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err, 'FindUser'));
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.getNoteFoundPage);

mongoose
    .connect(MONGO_DB_DRIVER)
    .then(() => {
        return User.findOne()
            .then(user => {
                if (!user) {
                    new User({
                        name: 'Ivan',
                        email: 'ipyka@gmail.com',
                        cart: {
                            items: []
                        }
                    })
                        .save()
                }
            });
    })
    .then(() => app.listen(3000, () => console.log("Server is runing!")))
    .catch(err => console.log(err, 'db connection'));