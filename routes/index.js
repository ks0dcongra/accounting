// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const accounts = require('./modules/accounts')

router.use('/', home)
router.use('/accounts', accounts)

module.exports = router
