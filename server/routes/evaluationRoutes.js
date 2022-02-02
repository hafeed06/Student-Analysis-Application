const express = require('express');
const contact = require('../models/contact');
const evaluationService = require('../service/evaluationService');
const router = express.Router();
const userService = require('../service/contactService');

// routes
/**
 * @swagger
 * /evaluate/create:
 *   post:
 *     summary: Create an evaluation for a course
 *     description: /evaluate/create
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateEvaluation:
 *                 type: Date
 *               course:
 *                 type: objectId
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "evaluation json !"}
 */
router.post('/create', create);
/**
 * @swagger
 * /evaluate/:
 *   get:
 *     summary: Retreive a list of evaluate date and course
 *     description: /evaluate/
 *     responses:
 *       200:
 *         description: A list of evaluate.
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
 * /evaluate/{id}:
 *   get:
 *     summary: Retreive a evaluate by id
 *     description: /evaluate/{id}
 *     responses:
 *       200:
 *         description: /evaluate/{id} semester json.
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
    evaluationService.create(req.body)
        .then(evaluation => evaluation ? res.json(evaluation) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    evaluationService.getAll()
        .then(evaluation => res.json(evaluation))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    evaluationService.getByUserId(req.params.user)
        .then(contact => contact ? res.json(contact) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    evaluationService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    evaluationService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}