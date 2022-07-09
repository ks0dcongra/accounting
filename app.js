const express = require('express')
const app = express()
const exphbs = require('express-handlebars');

const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const Account = require('./models/account')

// 取得資料庫連線狀態
const db = mongoose.connection

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/', (req, res) => {
  Account.find() 
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(accounts => res.render('index', { accounts })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

