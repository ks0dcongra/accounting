// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')

router.use('/records', authenticator, records) // 加入驗證程序
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) // 加入驗證程序

module.exports = router
