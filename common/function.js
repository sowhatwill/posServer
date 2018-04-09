//获取当前时间戳
let timeStamp = _ => (new Date()).valueOf();

//过滤对象
let objFilter = obj => {
    for (let i in obj) {
        if (obj[i] == "undefined" || !obj[i]) {
            delete obj[i];
        }
    }
    return obj;
}

module.exports = {
    timeStamp,
    objFilter
}