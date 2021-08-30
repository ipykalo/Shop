const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoClient = MongoClient.connect(
    "mongodb+srv://ipyka:hV2VuDQK9NoUEQGI@cluster0.buupe.mongodb.net/shop?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(client => {
        db = client.db('shop');
        console.log('Connected to DB successfully!');
        return client;
    })
    .catch(err => console.log(err, 'Connection to DB failed!'));

const getDbInstance = () => {
    if (!db) {
        throw Error('DB instance not found!');
    }
    return db;
};

exports.mongoClient = () => mongoClient;
exports.getDbInstance = getDbInstance;