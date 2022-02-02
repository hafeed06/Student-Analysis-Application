const express = require('express');
const courseService = require('../service/courseService');
const router = express.Router();

// routes
/**
 * @swagger
 * /course/create:
 *   post:
 *     summary: Create a course 
 *     description: /course/create
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCourse:
 *                 type: string
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
 *     summary: Retreive a list of Course
 *     description: /course/ 
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
 *     description: /course/{id}
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
        .then(course => course ? res.json(course) : res.sendStatus(404))
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