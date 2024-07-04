const mongoose = require('mongoose');
require('dotenv').config()

const mongoURI = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@sages.p1zye6m.mongodb.net/file-sharing`;

async function connectMongo() {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB!");
}

connectMongo().catch(error => console.log(error));

module.exports = connectMongo;