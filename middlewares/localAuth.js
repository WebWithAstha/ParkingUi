const express = require('express');
const router = express.Router();
const passport = require('passport');
const userModel = require('../models/userModel.js')
// const otpModel = require('../models/otp.js')
const localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))

// const sendmailController = require('../controllers/sendmail_controller.js')


router.get('/', function(req, res, next) {
    res.render('register', { footer:false });
  });

router.post('/register', async function (req, res, next) {
    const userdata = new userModel({
        username: req.body.username,
        email: req.body.email,
    })
    userModel.register(userdata, req.body.password)
        .then(async registeredUser => {
            // const mailOptions = {
            //     from: process.env.EMAIL,
            //     to: registeredUser.email,
            //     subject: "Account Creation",
            //     html: `Hello ${registeredUser.username}, </br> <b>${otp}</b> your account has been successfully created.`
            // }
            // await sendmailController.sendmail(req, res, mailOptions)

            passport.authenticate("local")(req, res, function () {
                res.redirect('/home')
            })
        })
})





module.exports = router;
