const express = require('express');
const router = express.Router();
const adminService = require('../service/adminService');
const jwt = require('../config/jwt');
const admin = require('../models/admin');
// routes
/**
 * @swagger
 * /admin/authenticate:
 *   post:
 *     summary: authenticate admin
 *     description: Authenticate a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "User json !"}
 */
router.post('/authenticate', authenticate);
/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a new admin
 *     description: /admin/register
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "Admin json !"}
 */
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
/**
 * @swagger
 * /admin/getRoles:
 *   post:
 *     summary: Get Roles
 *     description: /admin/getRoles
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: object
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "Roles json !"}
 */
router.post('/getRoles', getRole)

module.exports = router;

function authenticate(req, res, next) {
    
    adminService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    adminService.create(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'incorrect parameters or the user exist' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    adminService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    adminService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    adminService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    adminService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    adminService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getRole(req, res, next) {
    adminService.getRole(req.body.id)
        .then(role => res.json(role))
        .catch(err => next(err));
}