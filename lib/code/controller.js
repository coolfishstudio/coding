'use stricr';

var codeManager = require('./manager');

exports.home = function *() {
    yield this.render('pages/home');
};

exports.redirectHtml = function *() {
    var id = codeManager.getObjectID().toString();
    this.redirect('/html/' + id);
};

exports.editor = function *() {
    yield this.render('pages/editor');
};
