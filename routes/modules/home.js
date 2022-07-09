// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Account = require('../../models/account')

router.get('/', (req, res) => {
  Account.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })
    .then(accounts => res.render('index', { accounts })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

module.exports = router
