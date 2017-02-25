'use strict';

var userModel = require('./model');

/**
 * 根据userId获取用户信息
 */
exports.getUserById = function *(userId) {
    if (!userId) throw new Error('no userId');
    return yield userModel.getUserById(userId);
};

/**
 * 根据email获取用户信息
 */
exports.getUserByEmail = function *(email) {
    if (!email) throw new Error('no email');
    return yield userModel.getUserByEmail(email);
};

/**
 * 创建用户
 */
exports.insert = function *(userId, email, password) {
    if (!email || !password || !userId) throw new Error('no email or no password');
    return yield userModel.insertUser({
        _id: userId,
        email: email,
        password: password,
        createdAt: Date.now()
    });
};
