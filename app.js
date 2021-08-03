const express = require('express');
const helper = require('./util/helper');
const mongodb = require('./util/db');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartProduct = require('./models/cart-product');
const Order = require('./models/order');
const OrderProduct = require('./models/order-product');

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
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch(err => console.log(err, 'FindUser'));
    next();
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(errorController.getNoteFoundPage);

mongodb.mongoClient()
    .then(() => app.listen(3000, () => console.log("Server is runing!")))


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