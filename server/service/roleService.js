require('dotenv').config()
const db = require('../config/db');
const Role = db.Role;

module.exports = {
    getAll,
    getById,
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

async function create(RoleParm) {
    // validate
    try {
        const role = await Role.findOne({ nameRole: RoleParm.nameRole })
        if (role) {
            // copy RoleParm properties to Role
            Object.assign(Role, RoleParm);
        }else{
            const role = new Role(RoleParm);
            // save Role
            await role.save();
        }
    } catch (error) {
        throw 'Role "' + RoleParm.nameRole + '" has an error';
    }
}


async function update(id, RoleParm) {
    const semseters = await Role.findById(id);

    // validate
    if (!semseters) throw 'Role not found';
    const role = await Role.findOne({nameRole:RoleParm.nameRole});
    // copy RoleParm properties to Role
    Object.assign(role, RoleParm);

    await role.save();
}

async function _delete(id) {
    await Role.findByIdAndRemove(id);
}

