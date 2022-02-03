require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const roleService = require("../service/roleService")
const Admin = db.Admin;

module.exports = {
    authenticate,
    getAll,
    getRole,
    getById,
    getByName,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const admin = await Admin.findOne({ username });
    if (admin && bcrypt.compareSync(password, admin.hash)) {
        const token = jwt.sign({ sub: admin.id }, process.env.SECRET, { expiresIn: '7d' });
        return {
            ...admin.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await Admin.find();
}

async function getById(id) {
    return await Admin.findById(id);
}

async function getByName(username) {
    return await Admin.findOne({username : username});
}

async function create(userParam) {
    // validate
    if (await Admin.findOne({ username: userParam.username })) {
        throw 'Admin "' + userParam.username + '" is already taken';
    }
    const admin = new Admin(userParam);

    // hash password
    if (userParam.password) {
        admin.hash = bcrypt.hashSync(userParam.password, 10);
    }
    // save Admin
    if(await admin.save()){
        return {
            ...admin.toJSON()
        };
    }
    
}


async function update(id, userParam) {
    const admin = await Admin.findById(id);

    // validate
    if (!admin) throw 'User not found';
    if (admin.username !== userParam.username && await Admin.findOne({ username: userParam.username })) {
        throw 'Admin "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(admin, userParam);

    await admin.save();
}

async function _delete(id) {
    await Admin.findByIdAndRemove(id);
}

async function getRole(id){
    const admin =  await Admin.findById(id)
    return await roleService.getByRole(admin.role)

}

