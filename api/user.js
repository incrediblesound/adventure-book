const { User } = require('../models/models.js')

module.exports = app => {

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body

    User.findOne({ username }).exec().then(user => {
      const userExists = user !== null
      const clientUser =  userExists && { username: user.username, id: user._id }
      if (userExists) {
        user.comparePassword(password, (err, isMatch) => {
          if (isMatch) {
            req.session.user = clientUser
            res.send({ success: true, userExists, user: clientUser})
          } else {
            res.send({ success: false, reason: 'Password incorrect'})
          }
        })
      } else {
        res.send({ userExists, user: clientUser })
      }
    })
  })

  app.post('/api/signup', (req, res) => {
    const { username, password, email } = req.body
    console.log(req.body)
    User.findOne({ username }).exec().then(result => {
      console.log(result)
      if(result !== null){
        res.send({ success: false, reason: 'user already exists' })
      } else {
        const user = new User({ username, password, email })
        user.save()
          .then(result => {
            const user = { username: result.username, id: result._id }
            req.session.user = result
            res.send({ success: true, user })
          })
          .catch(err => {
            res.send({ success: false, reason: err })
          })
      }
    })
  })

  app.get('/api/logout', (req, res) => {
    req.session.user = null
    res.end()
  })

  app.post('/api/auth', (req, res) => {
    if(req.session.user){
      res.send(req.session.user)
    } else {
      res.send(false)
    }
  })

}
