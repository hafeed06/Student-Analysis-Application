const mongoose = require('mongoose')

const MarkSchema = new mongoose.Schema({
    result:{
        type:String,
        required:true
    },
    dateResult:{
        type:Date,
        required:false
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    evaluation : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evaluation'
    }
});

MarkSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Mark', MarkSchema)