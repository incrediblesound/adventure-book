const { Story } = require('../models/models.js')

module.exports = app => {
  app.get('/api/stories/', (req, res) => {
    Story.find({ published: true })
      .then(result => {
        res.send({ success: true, stories: result })
      })
      .catch(err => {
        res.send({ success: false, reason: err })
      })
  })

  app.get('/api/stories/:author', (req, res) => {
    const { author } = req.params
    let query = Story.find({ author })
    if (author === req.session.username) {
      query = query.where({ published: true})
    }
    query.then(result => {
      res.send({ success: true, stories: result })
    })
    .catch(err => {
      res.send({ success: false, reason: err })
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

  app.post('/api/story/publish/', (req, res) => {
    const { id, published } = req.body
    Story.findById(id).then(story => {
      if(!story){
        res.send({ success: false, reason: 'couldnt find story!' })
      } else {
        story.published = published
        story.save().then(() => {
          res.send({ success: true })
        })
      }
    })
  })
}
