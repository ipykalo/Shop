const fs = require('fs');
const path = require('path');
const https = require('https');
const mongoose = require('mongoose');

const app = require('./app');
const config = require('./config');

mongoose.connect(config.MONGO_DB_DRIVER)
    .then(() => {
        //app.listen(process.env.PORT || 3000, () => console.log("Server is runing!"))
        https.createServer({
            key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
        }, app)
            .listen(process.env.PORT || 3000, () => console.log(`Server is runing on the port: ${process.env.PORT}`));
    })
    .catch(err => console.log(err, 'db connection'));