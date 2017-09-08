const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ObjectId = mongoose.Schema.Types.ObjectId
const SALT_FACTOR = 10

const { categories } = require('../src/Create/constants.js')


mongoose.connect('mongodb://localhost/stories')

const storySchema = mongoose.Schema({
    title: { type: String, reqired: true },
    published: Boolean,
    author: String,
    description: String,
    category: {
      type: String,
      enum: categories,
      required: false
    },
    content: { type: String, required: true },
}, { timestamps: true })

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
}, { timestamps: true })

userSchema.pre('save', function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            this.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const Story = mongoose.model('Story', storySchema)
const User = mongoose.model('User', userSchema)

module.exports = {
  Story,
  User
}
