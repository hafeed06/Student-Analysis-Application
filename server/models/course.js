const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: objectId
 *           description: The course ID.
 *           example: sqdsqd
 *         nameCourse:
 *           type: string
 *           description: The name of the course.
 *           example: Database
 *         typeCourse:
 *           type: objectId
 *           description: TypeCourse
 *           example: 6dhsjdkkdllf
 */
const CourseSchema = new mongoose.Schema({
    nameCourse:{
        type:String,
        required:true
    },
    typeCourse : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeCourse'
    },
    semester : {
        type: [Schema.Types.ObjectId],
        ref: 'Semester'
    }
})

CourseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Course', CourseSchema)