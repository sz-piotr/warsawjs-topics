const express = require('express')
const path = require('path')
const passport = require('passport')
const { Strategy: GitHubStrategy} = require('passport-github')

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://warsawjs-topics-test.herokuapp.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    return cb(profile)
  })
)

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.render('index')
})

app.get(
  '/auth/github',
  passport.authenticate('github')
)

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/')
  }
)

app.listen(process.env.PORT || 4000)
