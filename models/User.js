const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.authenticate = function (password) {
  return bcrypt.compare(password, this.password)
    .then(isMatch => isMatch ? this : false);
};

UserSchema.methods.encrypt = function () {
  // eslint-disable-next-line handle-callback-err
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) throw err;
      this.password = hash;
    }));
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
