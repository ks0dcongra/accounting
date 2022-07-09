const Account = require('../account')
const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Account.create({ name: `name-${i}` })
  }
  console.log('done')
})
