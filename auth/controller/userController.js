const bcrypt = require('bcrypt')
// const initializePassport = require('./passport-config')
const { readFileSync, writeFileSync } = require('fs')
const User = []

const register = async(req, res) => {
   try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
    User.push({
        id:Date.now(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    res.redirect('/login')
   } catch (error) {
        throw new Error(error)
   }
   console.log(User)
}

const login = (req, res) => {
    
}


module.exports = { register, login }