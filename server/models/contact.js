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
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
})

module.exports = mongoose.model('Contact', ContactSchema)