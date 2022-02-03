require('dotenv').config()
const db = require('../config/db');
const Mark = db.Mark;

module.exports = {
    getAll,
    getById,
    getByUser,
    getByUserResult,
    getByDate,
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

async function getByUser(id) {
    return await Mark.find({user: id}).sort({'dateResult':'descending'});
}

async function create(markParam) {
    // validate
    try {
        const mark = new Mark(markParam);
        // save contact
        return await mark.save();
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

async function getByUserResult(user){
    return await  Mark.find({user: user}).where('result').gt(15).sort('result').where("asc").limit(5)
}

async function getByDate(user, date, number){
    date.setMonth(date.getMonth() - number)
    console.log(date)
    return await  Mark.find({user: user}).where('dateResult').lt(date).sort('result').where("asc").limit(5)
}
