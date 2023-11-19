const express = require('express')
const router = express.Router()

const { register, login } = require('../controller/userController')

router.post('/login', login).post('/register', register)

module.exports = router;