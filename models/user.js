const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  favoriteBook: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// hash password before saving to db
UserSchema.pre('save', function(next) { // arrow function `this` refers to an empty obj
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) { return next(err) }
    user.password = hash;
    next();
  })
});

const User = mongoose.model("User", UserSchema);
module.exports = User
