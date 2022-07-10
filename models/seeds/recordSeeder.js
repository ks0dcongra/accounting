const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '12'
  }
]

const SEED_RECORD = [
  {
    name: '午餐',
    date: '2019-04-23',
    amount: '60',
    user: '廣志',
    category: '餐飲食品'
  },
  {
    name: '晚餐',
    date: '2019-04-23',
    amount: '60',
    user: '廣志',
    category: '餐飲食品'
  },
  {
    name: '捷運',
    date: '2019-04-23',
    amount: '120',
    user: '廣志',
    category: '交通出行'
  },
  {
    name: '電影：驚奇隊長',
    date: '2019-04-23',
    amount: '220',
    user: '小新',
    category: '休閒娛樂'
  },
  {
    name: '租金',
    date: '2015-04-01',
    amount: '25000',
    user: '廣志',
    category: '家居物業'
  }
]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => {
      return Promise.all(Array.from(
        { length: SEED_USER.length },
        (_, i) => bcrypt.hash(SEED_USER[i].password, salt)
      ))
    })
    .then(hash => {
      return Promise.all(Array.from(
        { length: SEED_USER.length },
        (_, i) => User.create({
          name: SEED_USER[i].name,
          email: SEED_USER[i].email,
          password: hash[i]
        })
      ))
    })
    .then(user => {
      Promise.all(SEED_RECORD.map(recordSeeder => {
        return Category.find({ name: recordSeeder.category })
          .lean()
          .then(categories => {
            Promise.all(user.map(userSeeder => {
              if (categories[0].name === recordSeeder.category && recordSeeder.user === userSeeder.name) {
                recordSeeder.categoryId = categories[0]._id
                recordSeeder.userId = userSeeder._id
                return Record.create(recordSeeder)
              }
            }))
          })

      }))
    })
    .then(() => {
      setTimeout(() => {
        console.log('done.')
        process.exit()
      }, 500)
    })
    .catch((error) => {
      setTimeout(() => {
        console.log(error)
      }, 500)
    })
})