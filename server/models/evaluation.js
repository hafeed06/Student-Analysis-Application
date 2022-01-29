const mongoose = require('mongoose')

const EvaluationSchema = new mongoose.Schema({
    dateEvaluation:{
        type:Date,
        require:true
    },
    course : {
        type: [Schema.Types.ObjectId],
        ref: 'Course'
    }
})

module.exports = mongoose.model('Evaluation', EvaluationSchema)