'use strict';

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var addPost = require('./routes/addpost.js');
var signup = require('./routes/signup.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(function(req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});

app.use('/addpost', addPost); // Check out this route for an example on where to get started with form validation.
app.use('/signup', signup); // Write your form and validations inside this route.

app.get('/', function(req, res) {
    res.render('home', {});
});

// app.use((err, req, res, next) => {
//     if (err.status) {
//         return res.status(err.status).send(err);
//     }
//     console.error(err);
//     res.sendStatus(500);
// });




var port = 3000;
app.listen(port, function() {
    console.log("App listening on: " + port);
});
