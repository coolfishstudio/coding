'use strict';

var config = require('../../config');
var request = require('request');

var clientId = config.GITHUB.CLIENTID;
var clientSecret = config.GITHUB.CLIENTSECRET;

var BASE_URL = 'https://api.github.com';
var API_TOKEN = 'https://github.com/login/oauth/access_token';
var API_GET_USER = BASE_URL + '/user';

var postGithub = function (url, callback) {
    request.post(url, function (err, httpResponse, body) {
        callback(err, body);
    });
};

var fetchGithub = function (url, option, callback) {
    //格式化参数字段
    switch (arguments.length) {
        case 2:
            if ('function' === typeof option) {
                callback = option;
                option = undefined;
            }
            break;
        case 1:
            if ('function' === typeof url) {
                callback = url;
                url = undefined;
            }
    }
    if (!url) {
        return callback('参数不足');
    }
    if (!option) {
        option = {};
    }
    request.get(url, function (err, httpResponse, body) {
        callback(err, body);
    });
}

exports.getToken = function (code, callback) {
    var url = API_TOKEN + '?client_id=' + clientId + '&client_secret=' + clientSecret + '&code=' + code;
    postGithub(url, callback);
};

exports.getUser = function (token, callback) {
    var url = API_GET_USER + '?access_token=' + token;
    fetchGithub(url, callback);
};
