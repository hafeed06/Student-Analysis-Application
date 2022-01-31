const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     TypeCourse:
 *       type: object
 *       properties:
 *         id:
 *           type: objectId
 *           description: The course ID.
 *           example: sqdsqd
 *         nameTypeCourse:
 *           type: string
 *           description: The name of the type of course.
 *           example: Technical course
 */
const TypeCourseSchema = new mongoose.Schema({
    nameTypeCourse:{
        type:String,
        required:true
    }
});

TypeCourseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('TypeCourse', TypeCourseSchema)