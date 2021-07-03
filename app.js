const express = require('express');
const helper = require('./util/helper');

const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(helper.getPath('public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use((req, res) => res.status(404).sendFile(helper.getPath('views', '404.html')));

app.listen(3000, () => console.log(helper.getPath('public'), "Server is runing!"));