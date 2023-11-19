const express = require('express')
const morgon = require('morgan')
const route = require('./routes/userRoute')

const app = express()
require('dotenv').config()

app.use(morgon('dev'))
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')

const port = process.env.PORT || 3000


app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Ben'})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.use(route)

app.listen(port, ()=> {
    console.log(`server is listening on port ${port}`)
})