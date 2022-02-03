require('dotenv').config()
const db = require('../config/db');
const Role = db.Role;

module.exports = {
    getAll,
    getById,
    getByRole,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Role.find();
}

async function getById(id) {
    return await Role.findOne(id);
}

async function getByRole(role) {
    return await Role.find({nameRole: role.nameRole});
}

async function create(RoleParm) {
    // validate
    try {
        const role = await Role.findOne({ nameRole: RoleParm.nameRole })
        if (role) {
            // copy RoleParm properties to Role
            Object.assign(role, RoleParm);
        }else{
            const role = new Role(RoleParm);
            // save Role
            return await role.save();
        }
    } catch (error) {
        throw 'Role "' + RoleParm.nameRole + '" has an error';
    }
}


async function update(id, RoleParm) {
    const roles = await Role.findById(id);

    // validate
    if (!roles) throw 'Role not found';
    const role = await Role.findOne({nameRole:RoleParm.nameRole});
    // copy RoleParm properties to Role
    Object.assign(role, RoleParm);

    await role.save();
}

async function _delete(id) {
    await Role.findByIdAndRemove(id);
}

