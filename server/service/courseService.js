require('dotenv').config()
const db = require('../config/db');
const Course = db.Course;

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    update,
    getByIdNew,
    delete: _delete
};

async function getAll() {
    return await Course.find();
}

async function getById(id) {
    return await Course.findOne(id);
}

async function getByIdNew(id) {
    return await Course.findById(id);
}

async function getByName(nameCourse) {
    return await Course.findOne({nameCourse: nameCourse});
}

async function create(courseParm) {
    // validate
    try {
        const course = await Course.findOne({ nameCourse: courseParm.nameCourse })
        if (course) {
            // copy courseParm properties to Course
            Object.assign(course, courseParm);
        }else{
            const course = new Course(courseParm);
            // save contact
            await course.save();
        }
    } catch (error) {
        throw 'Course "' + error + '" has an error';
    }
}


async function update(id, courseParm) {
    const courses = await Course.findById(id);

    // validate
    if (!courses) throw 'Course not found';
    const course = await Course.findOne({nameCourse:courseParm.nameCourse});
    // copy contactParm properties to contact
    Object.assign(course, courseParm);

    await course.save();
}

async function _delete(id) {
    await Course.findByIdAndRemove(id);
}

