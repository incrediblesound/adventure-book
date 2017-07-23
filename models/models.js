const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect('mongodb://localhost/stories');

const storySchema = mongoose.Schema({
    name: String,
    author: ObjectId,
    category: String,
    text: String
});

const userSchema = mongoose.Schema({
  name: String,
  password: String
})

const Story = mongoose.model('Story', storySchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Story,
  User
}
