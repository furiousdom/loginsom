const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

const msg = {
  fillFields: 'Please fill all fields.',
  failedMatch: 'Passwords don\'t match.',
  short: 'Password should be at least 8 characters.',
  exists: 'User already exists.',
  regComplete: {
    label: 'success_msg',
    text: 'You are now registered and can log in.'
  },
  logoutComplete: {
    label: 'success_msg',
    text: 'You are logged out.'
  }
};

function register(req, res) {
  const { name, email, password, password2 } = req.body;
  // eslint-disable-next-line prefer-const
  let errors = [];

  if (!name || !email || !password || !password2) errors.push(msg.fillFields);

  if (password !== password2) errors.push(msg.failedMatch);

  if (password.length < 8) errors.push(msg.short);

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    return User.findOne({ email })
      .then(user => {
        if (user) {
          errors.push(msg.exists);
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          // eslint-disable-next-line handle-callback-err
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash(msg.regComplete.label, msg.regComplete.text);
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            }));
        }
      });
  }
}

function login(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
}

function logout(req, res) {
  req.logout();
  req.flash(msg.logoutComplete.label, msg.logoutComplete.text);
  res.redirect('/users/login');
}

module.exports = { register, login, logout };
