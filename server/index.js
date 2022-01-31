require('rootpath')();
const express = require('express');
const app = express();
require('rootpath')();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./config/jwt');
const errorHandler = require('./config/error-handler');

const connectDb = require('./config/db')
require('dotenv').config();
const port = process.env.PORT

// connection data base 
//connectDb()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(cors());
// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./routes/userRoutes'));
app.use('/contacts', require('./routes/contactRoutes'));


// global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})