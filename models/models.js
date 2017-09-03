const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Mixed = mongoose.Schema.Types.Mixed

const { categories } = require('../src/Create/index.jsx')


mongoose.connect('mongodb://localhost/stories')

const storySchema = mongoose.Schema({
    title: { type: String, reqired: true },
    author: String,
    category: {
      type: String,
      enum: categories,
      required: false
    },
    content: { type: String, required: true },
}, { timestamps: true })

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
}, { timestamps: true })

const Story = mongoose.model('Story', storySchema)
const User = mongoose.model('User', userSchema)

module.exports = {
  Story,
  User
}
