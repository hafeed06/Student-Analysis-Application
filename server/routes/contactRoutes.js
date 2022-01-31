const express = require('express');
const contact = require('../models/contact');
const contactService = require('../service/contactService');
const router = express.Router();
const userService = require('../service/contactService');

// routes
/**
 * @swagger
 * /contacts/create:
 *   post:
 *     summary: Create a contact for a user
 *     description: Use it after registring a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               area:
 *                 type: string
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               street:
 *                 type: string
 *               number:
 *                 type: string
 *               user:
 *                 type: objectId
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "User json !"}
 */
router.post('/create', create);
/**
 * @swagger
 * /contacts/:
 *   get:
 *     summary: Retreive a list of contact
 *     description: Use it after registring a new user
 *     responses:
 *       200:
 *         description: A list of contacts.
 *       503:
 *         description: When you're not logged
 *       500:
 *         description: Return error messages
 *       401:
 *         description: Invalid token
 */
router.get('/', getAll);
/**
 * @swagger
 * /contacts/{Id}:
 *   get:
 *     summary: Retreive a contact by userId
 *     description: Retrieve one contact
 *     responses:
 *       200:
 *         description: contact json.
 *       503:
 *         description: When you're not logged
 *       500:
 *         description: Return error messages
 *       401:
 *         description: Invalid token
 */
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
        .then(contact => res.json(contact))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    contactService.getByUserId(req.params.user)
        .then(contact => contact ? res.json(contact) : res.sendStatus(404))
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