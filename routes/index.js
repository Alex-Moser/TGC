var express     = require('express');
var router      = express.Router();
var passport    = require('passport');
var User        = require('../models/user');
var middleware  = require('../middleware');
var moment      = require('moment');
var Post        = require('../models/post');
var Message     = require('../models/message');

// Root route
router.get('/', function(req, res){
    res.render('landing');
});

// Show register form.
router.get("/register", function(req, res){
    res.render('user/register');
});

// Authorization Logic
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('user/register')
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/posts');
        });
    });
});

// Show Login form.
router.get('/login', function(req, res){
    res.render('user/login');
});

// Handle Login logic
router.post('/login', passport.authenticate('local',
    {successRedirect: '/', failureRedirect: '/login'}));
    /* , function(req, res){});  <-- Dont Think this is necessary just keeping
        on the off chance for now. */

// Logout route.
router.get('/logout/:id', function(req, res){
    req.logout();
    User.findById(req.params.id).exec(function(err, foundUser){
        foundUser.last_online = new Date;
        foundUser.save(function(err){
            if(err){
                console.log(err);
            } else{
                req.flash('success', 'You have logged out.');
                res.redirect('/');
            }
        });
    });
});

// Show profile page.
router.get('/profile/:id', function(req, res){
    User.findById(req.params.id).populate('items_posted').exec(function(err, foundUser){
        if(err) {
            console.log(err);
        } else {
            // Date formatting
            var joinDate = foundUser.date_joined;
            // Months start from 0, so add one.
            var joinMonth = joinDate.getMonth() + 1;
            var joinDay = joinDate.getDate();
            /* Year is num years since 1900 so subtract 100 to get only years
               after 2000. */
            var joinYear = joinDate.getYear() - 100;

            var joinDateFormatted= joinMonth+'/'+joinDay+'/'+joinYear;

            // Date formatting again.
            var onlineDate = foundUser.last_online;
            // Months start from 0, so add one.
            var onlineMonth = onlineDate.getMonth() + 1;
            var onlineDay = onlineDate.getDate();
            /* Year is num years since 1900 so subtract 100 to get only years
               after 2000. */
            var onlineYear = onlineDate.getYear() - 100;

            var onlineDateFormatted= onlineMonth+'/'+onlineDay+'/'+onlineYear;

            res.render('user/profile', {
                user: foundUser, posts: foundUser.items_posted, jdate: joinDateFormatted, onlineDate: onlineDateFormatted
            });
        }
    });
});

module.exports = router;
