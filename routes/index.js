var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.use('/',require('../middlewares/localAuth.js'));
router.get('/login', function(req, res, next) {
  res.render('login', { footer:false });
});
router.get('/home', function(req, res, next) {
  res.render('home', { footer:false });
});
router.get('/status', function(req, res, next) {
  res.render('status', { footer:false });
});
router.get('/book/slot/:zone/:slot', function(req, res, next) {
  res.render('book', { footer:false });
});
router.get('/slots', function(req, res, next) {
  res.render('slots', { footer:false });
});

router.post('/login', passport.authenticate('local',{
  successRedirect:'/home',
  failureRedirect:'/login'
}), function (req, res, next) {});


module.exports = router;
