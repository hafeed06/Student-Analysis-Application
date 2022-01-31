require('rootpath')();
const express = require('express');
const app = express();
require('rootpath')();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./config/jwt');
const errorHandler = require('./config/error-handler');
const swaggerJsdoc      = require("swagger-jsdoc");
const swaggerUi         = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Messages',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './models/*.js'],
};
const swaggerSpec = swaggerJsdoc(options, {explore: true});

const connectDb = require('./config/db')
require('dotenv').config();
const port = process.env.PORT

// connection data base 
//connectDb()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {
  "origin": true,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.use(cors());
// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./routes/userRoutes'));
app.use('/contacts', require('./routes/contactRoutes'));
app.use('/api-docs/',cors(corsOptions), swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})