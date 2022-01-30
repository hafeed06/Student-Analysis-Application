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
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    evaluation : {
        type: [Schema.Types.ObjectId],
        ref: 'Evaluation'
    }
})

module.exports = mongoose.model('Mark', MarkSchema)