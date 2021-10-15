const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/router')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()


const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use('/api', router)



const start = async () => {
  try {
    const db = await mongoose.connect(`mongodb+srv://spb_address:cmhell228@cluster0.mmx2a.mongodb.net/spb_address?retryWrites=true&w=majority`, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    app.listen(process.env.PORT, () => {
      console.log(`Сервер запущен по адресу http://localhost:7000`)
    })
  } catch (e) {
    console.log('Сервер не запустился', e);
  }
}

start()
