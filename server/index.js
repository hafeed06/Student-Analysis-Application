const express = require('express')
const app = express()
const connectDb = require('./config/db')
require('dotenv').config();
const port = process.env.PORT

// connection data base 
connectDb()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})