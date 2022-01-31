const mongoose = require('mongoose')

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