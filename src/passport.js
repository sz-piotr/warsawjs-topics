const passport = require('passport')
const { Strategy: GitHubStrategy} = require('passport-github')

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.URL + '/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile)
  })
)

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

exports.passport = passport
