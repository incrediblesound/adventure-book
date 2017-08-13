const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;

mongoose.connect('mongodb://localhost/stories');

const storySchema = mongoose.Schema({
    name: String,
    author: String,
    category: String,
    content: String,
});

const userSchema = mongoose.Schema({
  name: String,
  password: String,
})

const Story = mongoose.model('Story', storySchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Story,
  User
}
