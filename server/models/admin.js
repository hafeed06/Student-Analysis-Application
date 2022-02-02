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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
})

AdminSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Admin', AdminSchema)