const { Schema, model } = require('mongoose')

const Address = new Schema({
  street: {type: String, required: true},
  house: {type: String, required: true},
  code: [{type: String, required: true}],
  coors: {type: String, required: true},
})

module.exports = model('Address', Address)
