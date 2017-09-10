const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const {
  User,
  Story
} = require('./models/models')
const apiStory = require('./api/story')
const apiUser = require('./api/user')

const app = new express()
app.use(express.static('public'))
app.use(express.static('dist'))

app.use(session({
  secret: 'blippity-bloppity',
  resave: false,
  saveUninitialized: true,
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/api/story', (req, res) => {
  const story = req.body.story
  Story.findOne({ title: story.title, author: story.author }).then(result => {
    if(result !== null){
      res.send({ success: false, reason: 'A story with this name already exists' })
    } else {
      const storyRecord = new Story(story)
      storyRecord.save()
        .then(() => {
          res.send({ success: true })
        })
        .catch(err => {
          res.send({ success: false, reason: err })
        })
    }
  }).catch(e => console.log(e))
})

app.put('/api/story', (req, res) => {
  const { content, name, _id } = req.body
  Story.findByIdAndUpdate(_id, { $set: { content, name }})
    .then(result => {
      res.send({ success: true })
    })
    .catch(err => {
      res.send({ success: false, reason: err })
    })
})

apiStory(app)
apiUser(app)

app.listen(process.env.port || 8080)
