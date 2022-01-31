const expressJwt = require('express-jwt');
require('dotenv').config()
const userService = require('../service/userService');

module.exports = jwt;

function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/contacts/create',
            '/api-docs/',
            '/api-docs/swagger-ui.css',
            '/api-docs/swagger-ui-init.js',
            '/api-docs/swagger-ui-bundle.js',
            '/api-docs/swagger-ui-standalone-preset.js',
            '/api-docs/favicon-32x32.png',
            '/api-docs/favicon-16x16.png',
            '/api-docs/favicon-32x32.png',
            '/api-docs/favicon-16x16.png'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};