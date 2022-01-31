const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: objectId
 *           description: The user ID.
 *           example: sqdsqd
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: ldandoy@gmail.com
 *         password:
 *           type: string
 *         username:
 *           type: string
 */
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    stdCode:{
        type:String,
        unique: true,
        required: true
    },
    hash: { type: String, required: true },
    email:{
        type:String,
        required:true
    }
})

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', UserSchema)