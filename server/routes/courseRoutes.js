const express = require('express');
const courseService = require('../service/courseService');
const router = express.Router();

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
 *         description: course json.
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
    courseService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    courseService.getAll()
        .then(contact => res.json(contact))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    courseService.getByUserId(req.params.user)
        .then(contact => contact ? res.json(contact) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    courseService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    courseService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}