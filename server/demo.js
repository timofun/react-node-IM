/**
 * Created by Administrator on 2018/6/20.
 * function : xxxxx
 */
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const DB_URL = 'mongodb://localhost:27017'

mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('mongo conect success')
})

// 类似于mysql表，mongodb里面有文档，字段概念
const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: String, require: true}
}))

// 新建数据
// User.create({
//   user: 'qwqww',
//   age: 44
// }, function (err, doc) {
//   if (!err) {
//     console.log(doc)
//   } else {
//     console.log(err)
//   }
// })

// 删除数据
// User.remove({age: 44}, function (err, doc) {
//   console.log(doc)
// })

// 更新数据
// User.update({'user': 'jack'}, {'$set': {'age': 30}}, function (err, doc) {
//   console.log(doc)
// })

app.get('/', function (req, res) {
  res.send('<h1>hello world</h1>')
})

app.get('/data', function (req, res) {
  // find({}) 查找全部
  // find查找出来的都是数组，findOne是对象
  User.findOne({'user': 'jack'}, function (err, doc) {
    res.json(doc)
  })
  // res.json({name: 'jack', age: 30})
})
app.listen(9093, function () {
  console.log('node app start at port 9093')
})
