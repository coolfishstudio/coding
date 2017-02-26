'use strict';

var router = require('koa-router')();
var codeController = require('./code/controller');
var userController = require('./user/controller');


router.get('/', codeController.home);
router.get('/html/:id', codeController.editor);
router.get('/html/', codeController.redirectHtml);


module.exports = router;
