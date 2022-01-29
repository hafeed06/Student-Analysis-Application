const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    country:{
        type:String,
        require:true
    },
    area:{
        type:String,
        require:false
    },
    city:{
        type:String,
        require:true
    },
    street:{
        type:String,
        require:false
    },
    number:{
        type:String,
        require:false
    },
    user : {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
})

module.exports = mongoose.model('Contact', ContactSchema)