/*
 * @Author: wlq 
 * @Date: 2018-03-21 17:20:28 
 * @Last Modified by: wlq
 * @Last Modified time: 2018-03-21 17:33:51
 * @Project Description: 
 */

const fun = require('../common/function')
const mongoose = require('./db')
let Schema = mongoose.Schema;
let user = mongoose.model('user', new Schema({
    user: {
        type: String,
        default: "姓名"
    },
    pwd: {
        type: String,
        default: "密码"
    },
    power: {
        type: Number,
        default: 2 //1.店长 2.店员
    },
    time: {
        type: Number,
        default: fun.timeStamp()
    }
}));

/**
 * 添加一条用户信息
 * 
 * @param {* Object} userObj 
 */
let add = (userObj) => {
    return new Promise((resolve, reject) => {
        new user(userObj).save(err => {
            if (err) {
                reject(err);
            }
            resolve({
                status: 1,
                msg: "添加成功"
            })
        })
    })
}
/**
 * 获取用户信息
 * 
 * @param {* Object} conditionObj 
 */
let get = (conditionObj = {}) => {
    return new Promise((resolve, reject) => {
        user.find(conditionObj, (err, docs) => {
            if (err) {
                reject(err)
            }
            resolve(docs)
        })
    })
}

module.exports = {
    add,
    get
}