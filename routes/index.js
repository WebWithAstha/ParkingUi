var express = require('express');
var router = express.Router();
const passport = require('passport');
const Razorpay = require('razorpay');
const userModel = require('../models/userModel.js');
var instance = new Razorpay({
  key_id: 'rzp_test_6I6FvnUbmGjI5S',
  key_secret: 'LA3sRQkHGcFo0NzBysyTz6hj',
});


/* GET home page. */
router.use('/',require('../middlewares/localAuth.js'));
router.get('/login', function(req, res, next) {
  res.render('login', { footer:false });
});
router.get('/home',isloggedIn,async function(req, res, next) {
  const loggedUser = await userModel.findOne({username:req.session.passport.user.username})

  res.render('home', { footer:false,loggedUser });
});
router.get('/status',isloggedIn, function(req, res, next) {
  res.render('status', { footer:false });
});
router.get('/book/slot/:zone/:slot',isloggedIn,async function(req, res, next) {
  const loggedUser = await userModel.findOne({username:req.session.passport.user.username})
  res.render('book', { footer:false,slot:req.params.slot,zone:req.params.zone,loggedUser });
});
router.get('/slots',isloggedIn, function(req, res, next) {
  res.render('slots', { footer:false });
});
router.post('/bookorder/:slot',isloggedIn,async function(req, res, next) {
  const loggedUser = await userModel.findOne({username:req.session.passport.user.username})
  loggedUser.status = true;
  await loggedUser.save();
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


function isloggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

module.exports = router;
