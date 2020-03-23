const express = require('express');
const msg = require('../config/messages');
const router = express.Router();

const { register, login, logout } = require('../controllers/users.controller');

function errorHandler(req, _, next) {
  const { name, email, password, rePassword } = req.body;
  const errors = [];
  if (!name || !email || !password || !rePassword) errors.push(msg.fillFields);
  if (password !== rePassword) errors.push(msg.failedMatch);
  if (password.length < 8) errors.push(msg.short);
  req.errors = errors;
  next();
}

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/logout', logout);

router.post('/register', errorHandler, register);
router.post('/login', login);

module.exports = router;
