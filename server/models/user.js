const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:false
    },
    email:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('User', UserSchema)