require('dotenv').config();

const { USER, PASSWORD, DATABASE } = process.env;

module.exports = {
    url: `mongodb+srv://${USER}:${PASSWORD}@cluster0.buupe.mongodb.net/${DATABASE}`
}