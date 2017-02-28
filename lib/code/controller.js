'use stricr';

var codeManager = require('./manager');

exports.login = function *() {
    yield this.render('pages/login');
};

exports.redirectHtml = function *() {
    var id = codeManager.getObjectID().toString();
    this.redirect('/html/' + id);
};

exports.editor = function *() {
    yield this.render('pages/editor');
};
