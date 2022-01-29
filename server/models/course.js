const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    nameCourse:{
        type:String,
        require:true
    },
    typeCourse : {
        type: [Schema.Types.ObjectId],
        ref: 'TypeCourse'
    },
    semester : {
        type: [Schema.Types.ObjectId],
        ref: 'Semester'
    }
})

module.exports = mongoose.model('Course', CourseSchema)