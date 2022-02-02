const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    nameRole:{
        type:String,
        required:true
    }
});

RoleSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Role', RoleSchema)