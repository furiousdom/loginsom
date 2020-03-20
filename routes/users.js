const express = require('express');
const router = express.Router();

const { register, login, logout } = require('../controllers/users.controller');

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/logout', logout);

router.post('/register', register);
router.post('/login', login);

module.exports = router;
