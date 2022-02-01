const express = require('express');
const typeCourse = require('../models/typeCourse');
const typeCourseService = require('../service/typeCourseService');
const router = express.Router();

// routes
/**
 * @swagger
 * /typeCourse/create:
 *   post:
 *     summary: Create a typeCourse 
 *     description: /typeCourse/create
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameTypeCourse:
 *                 type: string
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "TypeCourse json !"}
 */
router.post('/create', create);
/**
 * @swagger
 * /typeCourse/:
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
 * /typeCourse/{id}:
 *   get:
 *     summary: Retreive a typeCourse by id
 *     description: Retrieve one typeCourse
 *     responses:
 *       200:
 *         description: typeCourse json.
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
    typeCourseService.create(req.body)
    .then(() => typeCourse ? res.json(typeCourse) : res.status(400).json({message:'bad request'}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
    typeCourseService.getAll()
        .then(typeCourse => res.json(typeCourse))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    typeCourseService.getByUserId(req.params.user)
        .then(typeCourse => typeCourse ? res.json(typeCourse) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    typeCourseService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    typeCourseService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}