'use stricr';

var github = require('../helper/github');

exports.githubLogin = function *() {
    var code = this.query.code;
    github.getToken(code, function (err, result) {
        if (err) {
            this.redirect('/login');
        }
        var githubToken = result.match(/^access_token=(\w+)&/)[1];
        github.getUser(githubToken, function (err, userInfo) {
            if (err) {
                this.redirect('/login');
            }
            console.log('userInfo:', userInfo);
            
        });
    });
};