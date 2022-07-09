const express = require('express')
const router = express.Router()
const Account = require('../../models/account')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Account.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .lean()
    .then((account) => res.render('detail', { account }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .lean()
    .then((account) => res.render('edit', { account }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Account.findById(id)
    .then(account => {
      account.name = name
      return account.save()
    })
    .then(() => res.redirect(`/accounts/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .then(account => account.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
