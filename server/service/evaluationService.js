require('dotenv').config()
const db = require('../config/db');
const Evaluation = db.Evaluation;

module.exports = {
    getAll,
    getById,
    getByCourseDate,
    getByCourse,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Evaluation.find();
}

async function getById(id) {
    return await Evaluation.findById(id);
}

async function getByCourseDate(course, date) {
    return await Evaluation.findOne({course: course, dateEvaluation: date});
}

async function getByCourse(course) {
    return await Evaluation.find({course: course});
}

async function create(evaluationParam) {
    // validate
    try {
        const evaluation = new Evaluation(evaluationParam);
        // save evaluation
        console.log(evaluation.dateEvaluation)
        return await evaluation.save();
        }catch(error){
            console.log(error)
        }
}


async function update(id, evaluationParam) {
    const evaluations = await Evaluation.findById(id);

    // validate
    if (!evaluations) throw 'Evaluation not found';
    const evaluation = await Evaluation.findOne(id);
    // copy contactParm properties to contact
    Object.assign(evaluation, evaluationParam);

    await evaluation.save();
}

async function _delete(id) {
    await Evaluation.findByIdAndRemove(id);
}





