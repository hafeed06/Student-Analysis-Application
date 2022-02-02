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
    Course: require('../models/course'),
    Semester: require('../models/semester'),
    TypeCourse: require('../models/typeCourse'),
    Evaluation: require('../models/evaluation'),
    Mark: require('../models/mark'),
    Role: require('../models/role'),
    Admin: require('../models/admin'),
};