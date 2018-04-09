let url = "mongodb://localhost:27017/pos" // 连接mongodb的url
let mongoose = require('mongoose'); //加载mongoose模块
mongoose.connect(url); // 连接数据库
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('连接成功')
});
module.exports = mongoose;