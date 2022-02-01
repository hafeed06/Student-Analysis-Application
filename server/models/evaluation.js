const mongoose = require('mongoose')

const EvaluationSchema = new mongoose.Schema({
    dateEvaluation:{
        type:Date,
        required:true
    },
    course : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
})

EvaluationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Evaluation', EvaluationSchema)