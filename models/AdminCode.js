const { Schema, model } = require('mongoose')

const AdminCode = new Schema({
  password: {type: String, required: true, unique: true}
})

module.exports = model('AdminCode', AdminCode)
