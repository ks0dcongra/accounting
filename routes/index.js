// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const accounts = require('./modules/accounts')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/accounts', authenticator, accounts) // 加入驗證程序
router.use('/users', users)
router.use('/', authenticator, home) // 加入驗證程序

module.exports = router
