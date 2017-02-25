'use strict';

var base = require('../helper/db.js');
var db = base.getCollection('code');

exports.getObjectID = base.ObjectID;

exports.insertCode = function (data) {
    return function (done) {
        db.insert(data, done);
    }
};

exports.getCodeById = function (id) {
    return function (done) {
        db.findOne({ _id: id }, done);
    }
};

exports.updateCodeById = function (id, data) {
    return function (done) {
        db.findAndModify({ _id: id }, [], { $set: data }, { upsert: true, new: true }, done);
    }
};

exports.getCodesByUserId = function (userId) {
    return function (done) {
        db.find({ userId: userId }).toArray(done);
    }
};

exports.removeCodeById = function (id) {
    return function (done) {
        db.remove({ _id: id }, done);
    }
};
