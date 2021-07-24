const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shop',
    password: '12457800',
    waitForConnections: true
});

module.exports = pool.promise();