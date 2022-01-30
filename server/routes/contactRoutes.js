const express = require('express');
const contactService = require('../service/contactService');
const router = express.Router();
const userService = require('../service/contactService');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getByUserId);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function create(req, res, next) {
    contactService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    contactService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    contactService.getByUserId(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    contactService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    contactService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}