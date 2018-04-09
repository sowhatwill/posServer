const fun = require('../common/function')
const mongoose = require('./db')
let Schema = mongoose.Schema;
let goods = mongoose.model('goods', new Schema({
    goodsName: {
        type: String,
        default: "产品名称"
    },
    oldPrice: {
        type: Number
    },
    nowPrice: {
        type: Number
    },
    imgUrl: {
        type: String,
        default: "http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg"
    },
    saleCount: {
        type: Number,
        default: 0
    },
    goodsType: {
        type: Number,
        default: 1 //1:主食 2:零食 3:饮料 4:套餐
    },
    goodsSale: {
        type: Number,
        default: 1 //0:下架 1:上架
    },
    time: {
        type: String,
        default: fun.timeStamp()
    }
}));

/**
 * 添加一个货物
 * 
 * @param {* Object} goodsObj 
 */
let add = (goodsObj) => {
    return new Promise((resolve, reject) => {
        new goods(goodsObj).save(err => {
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
 * 获取所有或指定的物品
 * 
 * @param {* Object} conditionObj 
 */
let get = (conditionObj = {}) => {
    return new Promise((resolve, reject) => {
        goods.find(conditionObj, (err, docs) => {
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
 * @param {* String} id 货物Id 
 * @param {* Object} updateObj 要更新的数据对象
 */
let update = (id, updateObj) => {
    return new Promise((resolve, reject) => {
        goods.update({
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
 * 统计商品销量
 * 
 * @param {* String} id 货物Id 
 * @param {* Number} count 新增的数量
 */
let fieldAdd = (id, count) => {
    return new Promise((resolve, reject) => {
        goods.update({
            _id: id
        }, {
            $inc: {
                saleCount: count
            }
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
 * 删除一个商品
 * 
 * @param {* String} id 删除一个
 */
let del = id => {
    return new Promise((resolve, reject) => {
        goods.remove({
            _id: id
        }, function (err, docs) {
            if (err) {
                reject(err);
            }
            if (docs.ok) {
                resolve({
                    status: 1,
                    msg: "删除成功"
                });
            } else {
                resolve({
                    status: 0,
                    msg: "删除失败"
                });
            }
        });
    })
}

/**
 * 获取热销产品
 * 
 * @param {* Number} count 获取
 */
let hotGoods = count => {
    return new Promise((resolve, reject) => {
        goods.find()
            .limit(count)
            .sort("-saleCount")
            .exec((err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            })
    })
}

// update("5aaf24dc78029709c088fe2b", {
//     saleCount: 20,
//     time: fun.timeStamp()
// }).then(res => {
//     console.log(res)
// })

// del("5aaf63afbad97d2e3827c09f").then(res => {
//     console.log(res)
// })

// hotGoods(2).then(res => {
//     console.log(res)
// })

// fieldAdd("5ab0880c0db8382014cd1884", 20).then(res => {
//     console.log(res)
// })

module.exports = {
    add,
    get,
    update,
    del,
    hotGoods,
    fieldAdd
}