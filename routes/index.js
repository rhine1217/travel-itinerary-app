const router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google', // specifies which strategy to use
  { scope: ['profile', 'email']} // what information to get 
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/trips',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;