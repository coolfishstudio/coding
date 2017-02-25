'use strict';

var base = require('../helper/db.js');
var db = base.getCollection('user');

exports.insertUser = function (data) {
    return function (done) {
        db.insert(data, done);
    }
};

exports.getUesrById = function (id) {
    return function (done) {
        db.findOne({ _id: id }, done);
    }
};

exports.getUesrByEmail = function (email) {
    return function (done) {
        db.findOne({ email: email }, done);
    }
};

exports.updateUserById = function (id, data) {
    return function (done) {
        db.findAndModify({ _id: id }, [], { $set: data }, { new: true }, done);
    }
}
