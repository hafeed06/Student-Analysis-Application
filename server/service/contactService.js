require('dotenv').config()
const db = require('../config/db');
const Contact = db.Contact;

module.exports = {
    getAll,
    getByUserId,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Contact.find();
}

async function getByUserId(id) {
    return await Contact.findOne({user: id});
}

async function create(contactParm) {
    // validate
    try {
        const contact = await Contact.findOne({ user: contactParm.user })
        if (contact) {
            // copy contactParm properties to contact
            Object.assign(contact, contactParm);
        }else{
            const contact = new Contact(contactParm);
            // save contact
            await contact.save();
        }
    } catch (error) {
        throw 'Contact "' + contactParm.user + '" has an error';
    }
}


async function update(id, contactParm) {
    const contact = await Contact.findOne({user:contactParm.user});
    // copy contactParm properties to contact
    Object.assign(contact, contactParm);

    await contact.save();
}

async function _delete(id) {
    await Contact.findByIdAndRemove(id);
}

