const mongoose = require('mongoose')

const SemeseterSchema = new mongoose.Schema({
    nameSmester:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Semester', SemeseterSchema)