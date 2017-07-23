const express = require('express')
const bodyParser = require('body-parser')
const {
  User,
  Story
} = require('./models/models')

const app = new express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use('/assets', proxy(url.parse('http://localhost:8000/dist/assets')));
app.get('/api/login', (req, res) => {
  console.log('HEY!')
  res.end()
})
app.post('/api/signup', (req, res) => {
  console.log(req.body)
})

app.get('*', (req, res) => {
  console.log('Oooops!')
  res.end()
})

app.listen(8080);
