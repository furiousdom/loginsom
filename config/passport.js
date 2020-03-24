const LocalStrategy = require('passport-local');

const User = require('../models/User');
const msg = require('../config/messages');

function verifyLocal(email, password, done) {
  return User.findOne({ email })
    .then(user => {
      if (!user) return done(null, false, msg.notRegistered);
      return user.authenticate(password)
        ? done(null, user)
        : done(null, false, msg.wrongPassword);
    })
    .catch(err => done(err));
}

module.exports = passport => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, verifyLocal));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return User.findById(id, (err, user) => done(err, user));
  });
};
