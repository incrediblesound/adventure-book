const { Story } = require('../models/models.js')

module.exports = app => {
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

  app.get('/api/story/:id', (req, res) => {
    const { id } = req.params
    Story.findById(id).then(result => {
      res.send({ success: true, story: result })
    }).catch(err => {
      res.send({ success: false, reason: err })
    })
  })
}
