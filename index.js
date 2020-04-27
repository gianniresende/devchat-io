const express = require('express')
const app = express()
const path = require('path')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('home'))
mongoose
  .connect('mongodb://localhost/chat-socketio')
  .then(() => {
    app.listen(3000, () => {
      console.log('App running...')
    })
  })

