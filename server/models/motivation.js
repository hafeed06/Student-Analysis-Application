const mongoose = require('mongoose')

const MotivationSchema = new mongoose.Schema({
    quotte:{
        type:String,
        required:true
    },
    note:{
        type:Int16Array,
        required:true
    }
})

module.exports = mongoose.model('Motivation', MotivationSchema)