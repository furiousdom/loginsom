const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT = bcrypt.genSaltSync(10);

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

const encrypt = password => bcrypt.hash(password, SALT);

UserSchema.methods.encryptPassword = async function () {
  this.password = await encrypt(this.password);
  return this.save();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
