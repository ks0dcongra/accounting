const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const categoryList = [
  { name: '家居物業', icon: 'fa-house' },
  { name: '交通出行', icon: 'fa-van-shuttle' },
  { name: '休閒娛樂', icon: 'fa-face-grin-beam' },
  { name: '餐飲食品', icon: 'fa-utensils' },
  { name: '其他', icon: 'fa-pen' }
]

db.once('open', () => {
  Promise.all(Array.from(categoryList, category => {
    return Category.create(category)
  }))
    .then(() => {
      process.exit()
    })
})