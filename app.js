const express = require('express');
const helper = require('./util/helper');
const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
/**
 * Dynamic templating engin (pug) configuration
 * To render file use this res.render('shop')
 */
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(helper.getPath('public'))); //Serving static files (CSS)

app.use((req, res, next) => {
    User.find('612a2bcbc4a142c86e92bf1a')
        .then(user => {
            req.user = new User(user._id, user.name, user.email, user.cart);
            next();
        })
        .catch(err => console.log(err, 'FindUser'));
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(errorController.getNoteFoundPage);

mongoose
    .connect("mongodb+srv://ipyka:hV2VuDQK9NoUEQGI@cluster0.buupe.mongodb.net/shop?retryWrites=true&w=majority")
    .then(() => app.listen(3000, () => console.log("Server is runing!")))
    .catch(err => console.log(err, 'db connection'));


return
mongodb.sync()
    //sequelize.sync({ force: true })
    .then(() => User.findByPk(1))
    .then(user => {
        if (!user) {
            //TODO delete this code after implementing authentification
            return User.create({ name: 'Ivan', email: 'ivan@test.com' })
                .then(createdUser => createdUser.createCart())
        }
        return user;
    })
    .then(() => app.listen(3000, () => console.log("Server is runing!")))
    .catch(err => console.log(err));