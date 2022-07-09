const express = require('express')
const app = express()
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


const exphbs = require('express-handlebars');
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



app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

