'use strict';

var router = require('koa-router')();
var codeController = require('./code/controller');
var userController = require('./user/controller');
var authController = require('./auth/controller');

router.get('/', codeController.redirectHtml);
router.get('/auth/by/github', authController.githubLogin);
router.get('/html/', codeController.redirectHtml);
router.get('/html/:id', codeController.editor);
router.get('/login', codeController.login);

module.exports = router;
