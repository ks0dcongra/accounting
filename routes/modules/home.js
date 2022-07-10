// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const records = await Record.find({ userId }).lean()
    const categories = await Category.find().lean()
    let totalAmount = 0

    records.forEach(record => {
      totalAmount += record.amount
      categories.find(data => {
        if (data._id.toString().includes(record.categoryId.toString())) {
          record.icon = data.icon
          console.log(record.icon)
        }
      })
    })
    res.render('index', { records, totalAmount })
  }
  catch (error) {
    console.log(error.message)
  }
})

module.exports = router
