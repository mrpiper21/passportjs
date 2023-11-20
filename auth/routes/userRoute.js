const express = require('express')
const router = express.Router()

const { register, login } = require('../controller/userController');
// const passport = require('passport');

router.post('/register', register)

module.exports = router;