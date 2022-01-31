require('dotenv').config()
const db = require('../config/db');
const Semester = db.Semester;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Semester.find();
}

async function getById(id) {
    return await Semester.findOne(id);
}

async function create(semesterParm) {
    // validate
    try {
        const semester = await Semester.findOne({ nameSemester: semesterParm.nameSemester })
        if (semester) {
            // copy semesterParm properties to semester
            Object.assign(semester, semesterParm);
        }else{
            const semester = new Semester(semesterParm);
            // save semester
            await semester.save();
        }
    } catch (error) {
        throw 'Semester "' + semesterParm.nameSemester + '" has an error';
    }
}


async function update(id, semesterParm) {
    const semseters = await Semester.findById(id);

    // validate
    if (!semseters) throw 'Semester not found';
    const semester = await Semester.findOne({nameSemester:semesterParm.nameSemester});
    // copy semesterParm properties to semester
    Object.assign(semester, semesterParm);

    await semester.save();
}

async function _delete(id) {
    await Semester.findByIdAndRemove(id);
}

