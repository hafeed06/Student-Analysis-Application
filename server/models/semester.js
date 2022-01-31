const mongoose = require('mongoose')


/**
 * @swagger
 * components:
 *   schemas:
 *     Semester:
 *       type: object
 *       properties:
 *         id:
 *           type: objectId
 *           description: The semester ID.
 *           example: sqdsqd
 *         nameSemester:
 *           type: string
 *           description: The name of the semester.
 *           example: Fundamental semester
 */
const SemesterSchema = new mongoose.Schema({
    nameSemester:{
        type:String,
        required:true
    }
});

SemesterSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Semester', SemesterSchema)