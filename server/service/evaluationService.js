require('dotenv').config()
const db = require('../config/db');
const Evaluation = db.Evaluation;

module.exports = {
    getAll,
    getById,
    getByCourseDate,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Evaluation.find();
}

async function getById(id) {
    return await Evaluation.findOne(id);
}

async function getByCourseDate(courseId, date) {
    return await Evaluation.findOne({course: courseId, dateEvaluation: date});
}

async function create(evaluationParam) {
    // validate
    try {
        const evaluation = new Evaluation(evaluationParam);
        // save contact
        await evaluation.save();
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





