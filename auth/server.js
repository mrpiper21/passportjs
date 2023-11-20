if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const morgon = require('morgan')
const route = require('./routes/userRoute')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const port = process.env.PORT || 3000

const initializePassport = require('./passport-config')
initializePassport(passport, 
    email => User.find(user => user.email === email),
    id => User.find(user => user.id === id)
)

const app = express()

app.set('view-engine', 'ejs')

app.use(morgon('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Ben'})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
app.use(route)

app.listen(port, ()=> {
    console.log(`server is listening on port ${port}`)
})