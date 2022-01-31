const express = require('express');
const contact = require('../models/contact');
const semesterService = require('../service/semesterService');
const router = express.Router();
const userService = require('../service/contactService');

// routes
/**
 * @swagger
 * /course/create:
 *   post:
 *     summary: Create a course 
 *     description: Use for admin use that is admin only
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCourse:
 *               typeCourse:
 *                 type: objectId
 *               semester:
 *                 type: objectId
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "Course json !"}
 */
router.post('/create', create);
/**
 * @swagger
 * /course/:
 *   get:
 *     summary: Retreive a list of course
 *     description: List of courses 
 *     responses:
 *       200:
 *         description: A list of course.
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
 * /course/{id}:
 *   get:
 *     summary: Retreive a course by id
 *     description: Retrieve one course
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