const express = require('express');
const helper = require('./util/helper');

const app = express();
const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const config = require('./config');
/**
 * Dynamic templating engin (pug) configuration
 * To render file use this res.render('shop')
 */
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(helper.getPath('public'))); //Serving static files (CSS)

app.use(admin?.routes);
app.use(shopRoutes);
app.use((req, res) => {
    res.status(404).render(config?.pages?.notFound?.view, {
        config,
        pageTitle: config?.pages?.notFound?.pageTitle
    });
});

app.listen(3000, () => console.log("Server is runing!"));