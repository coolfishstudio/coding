'use strict';

var config = require('../../config');
var mongoskin = require('mongoskin');
var db = mongoskip.db(config.MONGO_URL, { native_parser: true });

exports.getCollection = function (collectionName) {
    return db.collection(collectionName);
};

exports.ObjectID = mongoskin.ObjectID;
