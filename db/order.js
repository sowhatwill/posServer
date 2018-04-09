/*
 * @Author: wlq 
 * @Date: 2018-03-21 10:45:40 
 * @Last Modified by: wlq
 * @Last Modified time: 2018-03-21 16:14:30
 * @Project Description: 
 */
/*
 * @Author: wlq 
 * @Date: 2018-03-21 10:45:39 
 * @Last Modified by: wlq 
 * @Last Modified time: 2018-03-21 10:45:39 
 * @Project Description: 
 */
/*
 * @Author: wlq 
 * @Date: 2018-03-21 10:45:36 
 * @Last Modified by: wlq 
 * @Last Modified time: 2018-03-21 10:45:36 
 * @Project Description: 
 */
const fun = require('../common/function')
const mongoose = require('./db')
let Schema = mongoose.Schema;
let order = mongoose.model('order', new Schema({
    orderNum: {
        type: String,
        default: "流水号"
    },
    orderInfo: {
        type: String,
        default: "订单详情"
    },
    operator: {
        type: String,
        default: "操作人员"
    },
    allPrice: {
        type: Number,
        default: 0
    },
    orderType: {
        type: Number,
        default: 1 //1:店内支付  2:外卖
    },
    orderPaid: {
        type: Number,
        default: 1 //0:未支付,挂单状态  1:已支付
    },
    time: {
        type: Number,
        default: fun.timeStamp()
    }
}));

/**
 * 添加一条订单信息
 * 
 * @param {* Object} orderObj 
 */
let add = (orderObj) => {
    return new Promise((resolve, reject) => {
        new order(orderObj).save(err => {
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
 * 获取订单信息
 * 
 * @param {* Object} conditionObj 
 */
let get = (conditionObj = {}) => {
    return new Promise((resolve, reject) => {
        order.find(conditionObj, (err, docs) => {
            if (err) {
                reject(err)
            }
            resolve(docs)
        })
    })
}


/**
 * 更细货物的状态
 * 
 * @param {* String} id 订单Id 
 * @param {* Object} updateObj 要更新的数据对象
 */
let update = (id, updateObj) => {
    return new Promise((resolve, reject) => {
        order.update({
            _id: id
        }, {
            $set: updateObj
        }, function (err, docs) {
            if (err) {
                reject(err);
            }
            if (docs.ok) {
                resolve({
                    status: 1,
                    msg: "修改成功"
                });
            } else {
                resolve({
                    status: 0,
                    msg: "修改失败"
                });
            }
        });
    })
}

/**
 * 获取销售
 * 
 * @param {* Number} startDate 开始时间
 * @param {* Number} endDate 结束时间
 * @param {* Object} operatorObj 操作人员的名称
 */
let dateOrder = (startDate, endDate, operatorObj) => {
    return new Promise((resolve, reject) => {
        order
            .find(operatorObj)
            .where('time').gt(startDate).lt(endDate)
            .exec((err, docs) => {
                if (err) {
                    reject(err)
                }
                resolve(docs)
            })

    })
}


module.exports = {
    add,
    get,
    update,
    dateOrder
}