const express = require('express');
const router = express.Router();

const { register, login, logout } = require('../controllers/users.controller');

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/logout', (req, res) => logout(req, res));

router.post('/register', (req, res) => register(req, res));
router.post('/login', (req, res, next) => login(req, res, next));

module.exports = router;
