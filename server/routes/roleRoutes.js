const express = require('express');
const contact = require('../models/contact');
const roleService = require('../service/roleService');
const router = express.Router();
const userService = require('../service/userService');
/**
 * @swagger
 * /role/create:
 *   post:
 *     summary: Create a role 
 *     description: /role/create
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameRole:
 *                 type: string
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "Semester json !"}
 */
router.post('/create', create)
/**
 * @swagger
 * /Role/:
 *   get:
 *     summary: Retreive a list of roles
 *     description: /role/
 *     responses:
 *       200:
 *         description: A list of role.
 *       503:
 *         description: When you're not logged
 *       500:
 *         description: Return error messages
 *       401:
 *         description: Invalid token
 */
router.get('/', getAll);
router.get('/:id', getByUserId);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function create(req, res, next) {
    roleService.create(req.body)
        .then(role => res.json(role))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    roleService.getAll()
        .then(role => res.json(role))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    roleService.getByUserId(req.params.user)
        .then(contact => contact ? res.json(contact) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    roleService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    roleService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}