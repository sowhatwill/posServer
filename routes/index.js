var express = require('express');
var router = express.Router();
const goods = require('../db/goods');
const order = require('../db/order');
const user = require('../db/user');
const fun = require('../common/function')
//设置跨域访问
router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

/*      goods货架          */

// 新增一个货物
router.post('/goods/add', function (req, res, next) {
  let goodsParam = req.body;
  goods.add(goodsParam).then(result => {
    res.json({
      status: 1,
      msg: "添加成功"
    })
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "添加失败"
    })
  })
});

/**
 * 获取货物
 */
router.get('/goods/get', (req, res, next) => {
  let paramObj = req.query;
  console.log(paramObj)
  goods.get(paramObj).then(result => {
    res.json({
      status: 1,
      msg: '获取成功',
      data: result
    })
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "获取失败"
    })
  })
});

/**
 * 更新货物
 */
router.put('/goods/update', (req, res, next) => {
  let paramObj = req.body;
  let id = paramObj.id;
  delete paramObj['id'];
  goods.update(id, paramObj).then(result => {
    if (result.status == 1) {
      res.json({
        status: 1,
        msg: '获取成功',
        data: result
      })
    } else {
      res.json({
        status: 0,
        msg: '更新失败',
        data: result
      })
    }
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "获取失败"
    })
  })
});

/**
 * 删除一个商品
 */
router.delete('/goods/delete', (req, res, next) => {
  let id = req.body.id;
  goods.del(id).then(result => {
    if (result.status == 1) {
      res.json({
        status: 1,
        msg: '删除成功'
      })
    } else {
      res.json({
        status: 0,
        msg: '删除失败'
      })
    }
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "获取失败"
    })
  })
});

/**
 * 获取热销商品
 */
router.get('/goods/hotGoods', (req, res, next) => {
  let count = req.query.count - 0;
  goods.hotGoods(count).then(result => {
    res.json({
      status: 1,
      msg: '获取成功',
      data: result
    })
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "获取失败"
    })
  })
});

/*          订单操作          */

// 新增一条订单信息
router.post('/order/add', function (req, res, next) {
  let orderParam = req.body;
  //计算价格
  let allPrice = 0;
  let orderInfo = "";
  let goodsCountArr = [];
  JSON.parse(orderParam.orderList).forEach(data => {
    {
      allPrice += data.count * data.price;
      orderInfo += `${data.goodsName}(¥${data.price} * ${data.count}),`;
      //更新商品销量
      goods.fieldAdd(data._id, data.count);
    }
  });
  let param = {
    orderNum: orderParam.orderNum,
    orderInfo: orderInfo.substring(0, orderInfo.length - 1),
    allPrice: allPrice,
    operator: orderParam.operator,
    orderPaid: orderParam.orderPaid
  }
  order.add(param).then(result => {
    res.json({
      status: 1,
      msg: "添加成功"
    })
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "添加失败"
    })
  })
});

/**
 * 获取订单信息
 */
router.get('/order/get', (req, res, next) => {
  let paramObj = req.query;
  console.log(paramObj)
  order.get(paramObj).then(result => {
    res.json({
      status: 1,
      msg: '获取成功',
      data: result
    })
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "获取失败"
    })
  })
});

/**
 * 更新订单
 */
router.put('/order/update', (req, res, next) => {
  let paramObj = req.body;
  let id = paramObj.id;
  delete paramObj['id'];
  order.update(id, paramObj).then(result => {
    if (result.status == 1) {
      res.json({
        status: 1,
        msg: '获取成功',
        data: result
      })
    } else {
      res.json({
        status: 0,
        msg: '更新失败',
        data: result
      })
    }
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "获取失败"
    })
  })
});

//获取指定时间的内的订单
router.get('/order/dateOrder', (req, res, next) => {
  let paramObj = req.query;
  let startDate = paramObj.startDate,
    endDate = paramObj.endDate ? paramObj.endDate : fun.timeStamp(),
    operator = paramObj.operator ? {
      operator: paramObj.operator
    } : {};
  order.dateOrder(startDate, endDate, operator).then(result => {
    res.json({
      status: 1,
      msg: '获取成功',
      data: result
    })
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "获取失败"
    })
  })
});

/*       用户         */
router.post('/user/add', function (req, res, next) {
  let userParam = req.query;
  if (userParam == {}) {
    userParam = req.body;
  }
  user.add(userParam).then(result => {
    res.json({
      status: 1,
      msg: "添加成功"
    })
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "添加失败"
    })
  })
});

/**
 * 获取货物
 */
router.get('/user/get', (req, res, next) => {
  let paramObj = req.query;
  user.get(paramObj).then(result => {
    res.json({
      status: 1,
      msg: '获取成功',
      data: result
    })
  }).catch(error => {
    console.error(error)
    res.json({
      status: 0,
      msg: "获取失败"
    })
  })
});

module.exports = router;