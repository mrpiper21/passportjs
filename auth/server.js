if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const morgon = require('morgan')
const route = require('./routes/userRoute')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcrypt')
const mdethoOverride = require('method-override')
const port = process.env.PORT || 3000

const User = []
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
app.use(mdethoOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkAuthenticated, async(req, res) => {
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
)

app.delete('/logout', (req, res) => {
    req.logout()
    req.redirect('/login')
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated (req, res, next){
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
app.listen(port, ()=> {
    console.log(`server is listening on port ${port}`)
})