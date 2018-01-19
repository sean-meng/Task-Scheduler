var express = require('express');

var router = express.Router();
var app = express();
var User = require('../userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      { title: 'Roommate Scheduler',
        author: 'Sean Meng'
      });
});

router.get('/login', function(req, res, next) {
    res.render('login',
        { title: 'Roommate Scheduler'
        });
});

router.post('/login', function(req, res, next){
    console.log(req.body.user_field);
    console.log(req.body.pass_field);
});

router.get('/register1', function(req, res, next){
    res.render('register1', {
            title: 'Roommate Scheduler'
        })
});

router.post('/register1', function(req, res, next){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.confpass;
    var numpeople = req.body.numpeople;

    // Validation
    req.checkBody('username', 'Your name must be at least 3 character Long').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('numpeople', 'Number of people must be at least 1').isInt({min: 1});


    var errors = req.validationErrors();

    if(errors || password != password2){
        res.send('Your login info is incorrect, please doublecheck');
        setTimeout(res.redirect('/'), 2000);
    }
    else {
        var newUser = new User({
            username: username,
            email:email,
            password: password,
            numpeople: numpeople
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);

        })

        res.redirect('/register2/numpeople=' + numpeople);
        next();

    }
});

router.get('/register2/numpeople=:numpeople', function(req, res, next){
    res.render('register2', {
        title: 'Roommate Scheduler',
        numpeople: req.params.numpeople
    })
});

router.post('/register2/', function(req, res, next){
    console.log(req.body);
});

module.exports = router;



