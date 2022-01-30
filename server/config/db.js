require('dotenv').config();
const mongoose = require('mongoose');
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGO_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user'),
    Contact: require('../models/contact'),
};