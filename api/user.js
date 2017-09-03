const { User } = require('../models/models.js')
const emailRegex = /.{1,}\@.{1,}/

module.exports = app => {
  
  app.post('/api/login', (req, res) => {
    User.findOne(req.body).then(result => {
      const userExists = result !== null
      res.send({ userExists, user: result })
    })
  })

  app.post('/api/signup', (req, res) => {
    const user = req.body
    if(!emailRegex.test(user.email)){
      res.send({ success: false, reason: 'Invalid email' })
    }
    User.findOne(user).then(result => {
      if(result !== null){
        res.send({ success: false, reason: 'user already exists' })
      } else {
        const user = new User(user)
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

}
