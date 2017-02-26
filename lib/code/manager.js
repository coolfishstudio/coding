'use strict';

var codeModel = require('./model');

exports.insert = function *(data) {
    console.log(codeModel.getObjectID);
    if (!data.id || !data.code) {
        throw new Error('Few parameters');
    }
    var codeInfo = yield codeModel.getCodeById(data.id);
    // 没有则创建
    if (!codeInfo) {
        var result = yield codeModel.insertCode({
            _id: data.id,
            alias: data.alias,
            code: data.code,
            type: data.type || 'html',
            userId: data.userId,
            createdAt: Date.now(),
            updatedAt: null
        });
        return { status: 0, data: result.ops[0] };
    }
    // 修改
    if (codeInfo.userId === data.userId) {
        var result = yield codeModel.updateCodeById(data.id, {
            code: data.code,
            updatedAt: Date.now(),
            alias: data.alias
        });
        return { status: 1, data: result.value };
    }
    // 分享保存新的
    if (codeInfo.userId !== data.userId) {
        var result = yield codeModel.insertCode({
            _id: codeModel.getObjectID().toString(),
            alias: data.alias,
            code: data.code,
            type: data.type || 'html',
            userId: data.userId,
            createdAt: Date.now(),
            updatedAt: null
        });
        return { status: 2, data: result.ops[0] };
    }
};

exports.getCodeById = function *(id) {
    return yield codeModel.getCodeById(id);
};

exports.getCodesByUserId = function *(userId) {
    return yield codeModel.getCodesByUserId(userId);
};

exports.updateById = function *(id, data) {
    return yield codeModel.updateById(id, data);
};

exports.removeById = function *(id, userId) {
    var codeInfo = yield codeModel.getCodeById(id);
    if (codeInfo.userId !== userId) {
        return yield codeModel.removeById(id);
    } else {
        throw new Error('The user doesn`t have permission to delete the code');
    }
};

exports.getObjectID = codeModel.getObjectID;
