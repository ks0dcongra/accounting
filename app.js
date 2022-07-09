const express = require('express')
const app = express()
const exphbs = require('express-handlebars');

const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const Account = require('./models/account')

// 取得資料庫連線狀態
const db = mongoose.connection
// 引用 body-parser
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  Account.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })
    .then(accounts => res.render('index', { accounts })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.get('/accounts/new', (req, res) => {
  return res.render('new')
})

app.post('/accounts', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Account.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/accounts/:id', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .lean()
    .then((account) => res.render('detail', { account }))
    .catch(error => console.log(error))
})

app.get('/accounts/:id/edit', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .lean()
    .then((account) => res.render('edit', { account }))
    .catch(error => console.log(error))
})

app.put('/accounts/:id', (req, res) => {
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

app.delete('/accounts/:id', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .then(account => account.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

