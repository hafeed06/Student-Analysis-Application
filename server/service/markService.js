require('dotenv').config()
const db = require('../config/db');
const Mark = db.Mark;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Mark.find();
}

async function getById(id) {
    return await Mark.findOne(id);
}

async function create(markParam) {
    // validate
    const mark = await Mark.findOne({ course: markParam.course, user: markParam.user })
    if (mark) {

        Object.assign(mark, markParam);
        await mark.save();
    }
    try {
        const mark = new Mark(markParam);
        // save contact
        await mark.save();
        }catch(error){
            console.log(error)
        }
}


async function update(id, markParam) {
    const marks = await Mark.findById(id);

    // validate
    if (!marks) throw 'Grade not found';
    const mark = await Mark.findOne(id);
    // copy contactParm properties to contact
    Object.assign(mark, markParam);

    await mark.save();
}

async function _delete(id) {
    await Mark.findByIdAndRemove(id);
}

