var express = require('express');

var router = express.Router();
var app = express();
var User = require('../userModel');
var Room = require('../roomModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      { title: 'Task Scheduler',
        author: 'Sean Meng and Vincent Lyau'
      });
});

router.get('/login', function(req, res, next) {
    res.render('login',
        { title: 'Task Scheduler'
        });
});

router.post('/login', function(req, res, next){
    console.log(req.body.user_field);
    console.log(req.body.pass_field);
});

router.get('/register1', function(req, res, next){
    res.render('register1', {
            title: 'Task Scheduler'
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

        res.redirect('/register2/numpeople=' + numpeople + '/id=' + newUser._id);
    }
});

router.get('/register2/numpeople=:numpeople/id=:id', function(req, res, next){
    res.render('register2', {
        title: 'Task Scheduler',
        numpeople: req.params.numpeople
    })
});


//error with extracting url data with the post method
router.post('/register2/numpeople=:numpeople/id=:id', function(req, res, next){
    var roomname = req.params.roomname;
    var emailList = req.params.emailList;

    var newRoom = new Room({
        roomname: roomname,
        numpeople: numpeople,
        email: emailList.splice()
    });



   res.redirect('/users/id=' + req.params.id);
});

router.get('/users/id=:id', function (req, res, next) {
    res.send(id);
});

module.exports = router;