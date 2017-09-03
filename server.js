const express = require('express')
const bodyParser = require('body-parser')
const {
  User,
  Story
} = require('./models/models')
const apiGet = require('./api/get')
const apiUser = require('./api/user')

const app = new express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

apiGet(app)
apiUser(app)

app.listen(8080)
