const express = require('express');
const helper = require('./util/helper');

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

app.use(adminRoutes);
app.use(shopRoutes);
app.use(errorController.getNoteFoundPage);

app.listen(3000, () => console.log("Server is runing!"));