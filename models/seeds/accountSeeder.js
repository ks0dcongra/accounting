const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Account = require('../account')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      const price = 100
      const species = 'food'
      return Promise.all(Array.from(
        { length: 2 },
        (_, i) => Account.create({ name: `name-${i}`, price, species, userId })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})