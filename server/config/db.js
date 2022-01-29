const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`mongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB