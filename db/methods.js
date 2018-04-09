const mongoose = require('./db')
let Schema = mongoose.Schema;
let stu = mongoose.model('stu', new Schema({
    name: String,
    age: Number,
    sex: Number
}));

let s = new stu({
    name: "wlq",
    age: 12,
    sex: 1
})
s.save(err => {
    console.log(err ? 'failed' : 'success')
})