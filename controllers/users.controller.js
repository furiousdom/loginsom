const User = require('../models/User');
const msg = require('../config/messages');

function register(req, res, next) {
  const { errors, body: { name, email, password, rePassword } } = req;
  const payload = { errors, name, email, password, rePassword };
  if (errors.length) return res.render('register', payload);
  return User.findOne({ email })
    .then(user => {
      if (user) {
        payload.errors.push(msg.exists);
        return res.render('register', payload);
      }
      const newUser = new User({ name, email, password });
      return newUser.encryptPassword()
        .then(() => {
          req.flash(msg.regComplete.label, msg.regComplete.text);
          res.redirect('/users/login');
        })
        .catch(err => next(err));
    });
}

function logout(req, res) {
  req.logout();
  req.flash(msg.logoutComplete.label, msg.logoutComplete.text);
  res.redirect('/users/login');
}

module.exports = { register, logout };
