require('dotenv').config()
const db = require('../config/db');
const TypeCourse = db.TypeCourse;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await TypeCourse.find();
}

async function getById(id) {
    return await TypeCourse.findOne(id);
}

async function create(typeCourseParm) {
    // validate
    try {
        const typeCourse = await TypeCourse.findOne({ nameTypeCourse: typeCourseParm.nameTypeCourse })
        if (typeCourse) {
            // copy typeCourseParm properties to typeCourse
            Object.assign(typeCourse, typeCourseParm);
        }else{
            const typeCourse = new TypeCourse(typeCourseParm);
            // save TypeCourse
            await typeCourse.save();
        }
    } catch (error) {
        throw 'TypeCourse "' + typeCourseParm.nameTypeCourse + '" has an error';
    }
}


async function update(id, typeCourseParm) {
    const typeCourses = await TypeCourse.findById(id);

    // validate
    if (!typeCourses) throw 'typeCourse not found';
    const typeCourse = await TypeCourse.findOne({nameTypeCourse:typeCourseParm.nameTypeCourse});
    // copy TypeCourseParm properties to TypeCourse
    Object.assign(typeCourse, typeCourseParm);

    await typeCourse.save();
}

async function _delete(id) {
    await TypeCourse.findByIdAndRemove(id);
}

