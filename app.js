const express = require('express');
const helper = require('./util/helper');

const app = express();
const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');
/**
 * Dynamic templating engin configuration
 * To render file use this res.render('shop')
 */
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(helper.getPath('public'))); //Serving static files (CSS)

app.use('/admin', admin.routes);
app.use(shopRoutes);
app.use((req, res) => {
    //res.status(404).sendFile(helper.getPath('views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000, () => console.log(helper.getPath('public'), "Server is runing!"));