const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role : {
        type: [Schema.Types.ObjectId],
        ref: 'Role'
    }
})

module.exports = mongoose.model('Admin', AdminSchema)