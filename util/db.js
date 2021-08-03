const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let subscribers = [];
let db;

const mongoClient = MongoClient.connect(
    "mongodb+srv://ipyka:hV2VuDQK9NoUEQGI@cluster0.buupe.mongodb.net/shop?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(client => {
        db = client.db('shop');

        if (subscribers.length) {
            subscribers.forEach(cb => typeof cb === 'function' && cb(db));
            subscribers = [];
        }
        console.log('Connected to DB successfully!');
        return client;
    })
    .catch(err => console.log(err, 'Connection to DB failed!'));

const getDbInstance = () => {
    return new Promise((resolve) => {
        if (!db) {
            subscribers.push(resolve);
        }
        return resolve(db);
    });
};

exports.mongoClient = () => mongoClient;
exports.getDb = getDbInstance;