const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: objectId
 *           description: The contact ID.
 *           example: sqdsqd
 *         area:
 *           type: string
 *           description: The area.
 *           example: villejuif
 *         country:
 *           type: string
 *         city:
 *           type: string
 *         street: 
 *           type: string
 *         number:
 *           type: string
 *         user:
 *           type: objectId
 *           description: UserId
 *           example: 6dhsjdkkdllf
 */
const ContactSchema = new mongoose.Schema({
    country:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:false
    },
    number:{
        type:String,
        required:false
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

ContactSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Contact', ContactSchema)