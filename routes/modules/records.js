const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')
const moment = require('moment')

router.get('/new', async (req, res) => {
  const categories = await Category.find().lean().sort('_id')
  res.render('new', { categories })
})

router.post('/', async (req, res) => {
  try {
    const userId = req.user._id
    const { name, date, categoryId, amount } = req.body
    const categories = await Category.find().lean().sort('_id')
    const errors = []
    if (!name || !date || !categoryId || !amount) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (errors.length) {
      res.render('new', { errors, name, date, categoryId, amount, categories })
    }
    await Record.create({ userId, name, date, categoryId, amount })
    res.redirect('/')
  }
  catch (error) {
    console.log(error.message)
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const categories = await Category.find().lean().sort('_id')
    const record = await Record.findOne({ _id, userId }).lean()
    // let categoryName = ''
    // let categoryId = ''
    record.date = moment(record.date).format('YYYY-MM-DD')

    if (categories.find(data => data._id.toString().includes(record.categoryId))) {
      categoryAll = categories.find(data => data._id.toString().includes(record.categoryId))
    }
    res.render('edit', { record, categoryAll, categories })
  }
  catch (error) {
    console.log(error.message)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const { name, date, categoryId, amount } = req.body
    const categories = await Category.find().lean().sort('_id')
    const errors = []
    if (!name || !date || !categoryId || !amount) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (errors.length) {
      return res.render('new', { errors, name, date, categoryId, amount, categories })
    }
    // reqBody.userId = userId
    const record = await Record.findOne({ _id, userId })
    record.name = name
    record.date = date
    record.categoryId = categoryId
    record.amount = amount
    record.save()
    res.redirect('/')
  }
  catch (error) {
    console.log(error.message)
  }
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
