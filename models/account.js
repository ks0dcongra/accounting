const mongoose = require('mongoose')
const Schema = mongoose.Schema
const accountSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  date: {
    type: Date,
    default: Date.now
  },
  class: {
    type: String,
    enum: ['home', 'transport', 'entertainment', 'food', 'other'],
    required: true
  },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Account', accountSchema)