const express = require('express');
const contact = require('../models/contact');
const semesterService = require('../service/semesterService');
const router = express.Router();
const userService = require('../service/userService');

// routes
/**
 * @swagger
 * /semester/create:
 *   post:
 *     summary: Create a semester 
 *     description: /semester/create
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameSemester:
 *                 type: string
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "Semester json !"}
 */
router.post('/create', create);
/**
 * @swagger
 * /semester/:
 *   get:
 *     summary: Retreive a list of semester
 *     description: /semester/
 *     responses:
 *       200:
 *         description: A list of semester.
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
 * /semester/{id}:
 *   get:
 *     summary: Retreive a semester by id
 *     description: /semester/{id}
 *     responses:
 *       200:
 *         description: /semester/{id} semester json.
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
    semesterService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    semesterService.getAll()
        .then(contact => res.json(contact))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    semesterService.getByUserId(req.params.user)
        .then(contact => contact ? res.json(contact) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    semesterService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    semesterService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}