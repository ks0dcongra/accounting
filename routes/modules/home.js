// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })
    .then(records => {
      res.render('index', { records })
    }) // 將資料傳給 index 樣板

    .catch(error => console.log(error)) // 錯誤處理
})

module.exports = router
