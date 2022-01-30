const mongoose = require('mongoose')

const EvaluationSchema = new mongoose.Schema({
    dateEvaluation:{
        type:Date,
        required:true
    },
    course : {
        type: [Schema.Types.ObjectId],
        ref: 'Course'
    }
})

module.exports = mongoose.model('Evaluation', EvaluationSchema)