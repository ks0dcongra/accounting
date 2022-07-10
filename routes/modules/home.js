// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const handlebars = require('handlebars')
handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

router.get('/', async (req, res) => {
  try {
    // const categories = await Category.find().lean().sort('_id')
    const userId = req.user._id
    const records = await Record.find({ userId }).lean()
    const categories = await Category.find().lean().sort()
    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
      categories.find(data => {
        if (data._id.toString().includes(record.categoryId.toString())) {
          record.icon = data.icon
        }
      })
    })
    res.render('index', { records, totalAmount, categories })
  }
  catch (error) {
    console.log(error.message)
  }
})

router.get('/:categoryId', async (req, res) => {
  try {
    const userId = req.user._id
    const categoryId = req.params.categoryId
    const records = await Record.find({ userId, categoryId }).lean()
    const categories = await Category.find().lean()
    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
      categories.find(data => {
        if (data._id.toString().includes(record.categoryId.toString())) {
          record.icon = data.icon
        }
      })
    })
    res.render('index', { records, totalAmount, categories })
  }
  catch (error) {
    console.log(error.message)
  }
})

module.exports = router
