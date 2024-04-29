var express = require('express');
var router = express.Router();
const passport = require('passport');
const Razorpay = require('razorpay');
var instance = new Razorpay({
  key_id: 'rzp_test_6I6FvnUbmGjI5S',
  key_secret: 'LA3sRQkHGcFo0NzBysyTz6hj',
});


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
  res.render('book', { footer:false,slot:req.params.slot,zone:req.params.zone });
});
router.get('/slots', function(req, res, next) {
  res.render('slots', { footer:false });
});
router.post('/bookorder/:slot',function(req, res, next) {
  var options = {
    amount: req.body.amt,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    res.send(order)
  });
})

router.post('/login', passport.authenticate('local',{
  successRedirect:'/home',
  failureRedirect:'/login'
}), function (req, res, next) {});


module.exports = router;
