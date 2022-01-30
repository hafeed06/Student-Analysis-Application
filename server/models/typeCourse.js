const mongoose = require('mongoose')

const TypeCourseSchema = new mongoose.Schema({
    nameTypeCourse:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('TypeCourse', TypeCourseSchema)