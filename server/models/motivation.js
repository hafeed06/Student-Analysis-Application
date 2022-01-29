const mongoose = require('mongoose')

const MotivationSchema = new mongoose.Schema({
    quotte:{
        type:String,
        require:true
    },
    note:{
        type:Int16Array,
        require:true
    }
})

module.exports = mongoose.model('Motivation', MotivationSchema)