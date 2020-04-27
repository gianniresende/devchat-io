const express = require('express')
const app = express()
const path = require('path')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const bodyParser = require('body-parser')
const session = require('express-session')

app.use(express.static('public'))
app.use(bodyParser.urlencoded())
app.use(session({
  secret: 'socketio',
  cookie: {
    maxAge: 10*60*1000
  }
}))

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('home'))
app.post('/', (req,res) => {
  req.session.user = {
    name: req.body.name
  }
  res.redirect('/room')
})

app.get('/room', (req, res) => {
  if(!req.session.user){
    res.redirect('/')
  }else{
    res.render('room', {
      name: req.session.user.name
    })
  }
})

mongoose
  .connect('mongodb://localhost/chat-socketio')
  .then(() => {
    app.listen(3000, () => {
      console.log('App running...')
    })
  })

