const express = require('express');
const markService = require('../service/markService');
const evaluationService = require('../service/evaluationService');
const router = express.Router();
const userService = require('../service/userService');
const { now } = require('mongoose');

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
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
/**
 * @swagger
 * /topGrade:
 *   get:
 *     summary: Returns the 5 top Grades 
 *     description: evaluate/topGrade in this api you provide those objects and the result
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "Evaluation grades list json !"}
 */
router.post('/topGrade', evaluationGrade);
/**
 * @swagger
 * /latestMonths/{number}:
 *   get:
 *     summary: Returns the 5 top Grades of the latest months  
 *     description: evaluate/latestMonths/{number} provide parameters
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "Evaluation grades list json !"}
 */
router.get('/latestMonths/:number', lateGradeSixmonth);

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

function getById(req, res, next) {
    evaluationService.getById(req.params.id)
        .then(evaluation => evaluation ? res.json(evaluation) : res.sendStatus(404))
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

async function evaluationGrade(req, res, next) {
    const user = await userService.getById(req.user.sub);
    try {
        const mark = await markService.getByUserResult(user)
        return res.send(mark)
    } catch (error) {
        console.log(error)
    }
}

async function lateGradeSixmonth(req, res, next) {
    const user = await userService.getById(req.user.sub);
    try {
        const date = new Date()
        await markService.getByDate(user, date, req.params.number)
        .then(mark => mark? res.send(mark) : res.sendStatus(400).json({message: "this record doesn't exist"}))
        .catch(err => next(err))
    } catch (error) {
        console.log(error)
    }
}