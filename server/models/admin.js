const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role : {
        type: [Schema.Types.ObjectId],
        ref: 'Role'
    }
})

module.exports = mongoose.model('Admin', AdminSchema)