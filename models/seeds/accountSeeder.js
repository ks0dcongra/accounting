const mongoose = require('mongoose') // 載入 mongoose
const Account = require('../account')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Account.create({ name: `name-${i}` })
  }
  console.log('done')
})
