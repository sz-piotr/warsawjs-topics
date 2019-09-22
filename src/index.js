const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const { passport } = require('./passport')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: process.env.SECRET || 'cats',
  resave: false,
  saveUninitialized: false,
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', function (req, res) {
  res.render('index', {
    loggedIn: !!req.user,
    user: req.user && req.user.displayName
  })
})

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] })
)

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/')
  }
)

app.use(function (err, req, res, next) {
  console.error(err)
  next(err)
})

app.listen(process.env.PORT || 4000)
