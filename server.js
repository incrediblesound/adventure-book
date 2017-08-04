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

app.get('/api/stories/', (req, res) => {
  Story.find()
    .select('name content author')
    .sort('-date')
    .then(result => {
      res.send({ success: true, stories: result })
    })
    .catch(err => {
      res.send({ success: false, reason: err })
    })
})

app.get('/api/stories/:author', (req, res) => {
  const { author } = req.params
  Story.find({ author })
    .select('name content author')
    .then(result => {
      res.send({ success: true, stories: result })
    })
    .catch(err => {
      res.send({ success: false, reason: err })
    })
})

app.post('/api/story', (req, res) => {
  const { content, title, name } = req.body.story
  Story.findOne({ title, author: name }).then(result => {
    if(result !== null){
      res.send({ success: false, reason: 'A story with this name already exists' })
    } else {
      const storyRecord = new Story({ name: title, author: name, content })
      storyRecord.save()
        .then(result => {
          res.send({ success: true })
        })
        .catch(err => {
          res.send({ success: false, reason: err })
        })
    }
  }).catch(e => console.log(e))
})

app.post('/api/login', (req, res) => {
  User.findOne(req.body).then(result => {
    const userExists = result !== null
    res.send({ userExists, user: result })
  })
})

app.post('/api/signup', (req, res) => {
  User.findOne(req.body).then(result => {
    if(result !== null){
      res.send({ success: false, reason: 'user already exists' })
    } else {
      const user = new User(req.body)
      user.save()
        .then(result => {
          res.send({ success: true, user: result })
        })
        .catch(err => {
          res.send({ success: false, reason: err })
        })
    }
  })
})

app.get('/api/story/:id', (req, res) => {
  const { id } = req.params
  Story.findById(id).then(result => {
    res.send({ success: true, story: result })
  }).catch(err => {
    res.send({ success: false, reason: err })
  })
})

app.listen(8080);
