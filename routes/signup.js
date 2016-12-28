'use strict';

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validations = require('../validations/signup');
const ev = require('express-validation');

// Write your form and validations inside this route file.


// Add form validations in /signup for:
// Username: Required. Must be more than 6 characters, must start with a letter, and no punctuation.
// Password: Required. Must be more than 8 characters with atleast One letter, one number, and one special character (!?/.,')
// Email: Required. Must be formatted like an email, (something @ something . something)
// First Name: Required.
// Last Name: Required.
// Phone Number: Required. Must be a 10 digit number formatted like: 999-888-9898
//
// STRETCH: Hook up a database that you insert these values into after you've validated them.
// REMINDER: Don't store passwords in plain text.. Make sure you hash it first!
router.get('/', function(req, res) {
    res.render('signup', {
        hasError: false,
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
});

router.post('/', ev(validations.post), (req, res, next) => {
    console.log(req.body);
    console.log("wtf");
    let postInfo = checkPost(req);
    // Handle rendering / redirecting here.
    // If there arent any validation errors, redirect to '/'
    if (!postInfo.hasError) {
        res.redirect('/');
    } else {
        res.render('signup', postInfo);
    }
});

//If there are validation errors, re-render the signup page, injecting the users previous inputs.
//res.render('signup', req.post);




// var postInfo = checkPost(req); // Run error checking.
//
// if (!postInfo.hasError) {
//     // Validations passed -- Submit into database and redirect.
//     res.redirect('/');
// } else {
//     res.render('add_post', postInfo);
// }
// });

function checkPost(req) {
    var info = {};
    info.hasError = false;
    info.error = {};

    //Required Checks
    checkRequired(info, req);

    //Email Check
    checkEmail(info, req);

    return info;
}

function checkEmail(info, req) {
    var str = req.body.email;
    var atFound = false;
    var dotFound = false;

    for (var i = 1; i < str.length; i++) {
        if (str[i] === '@' || atFound) {
            if (atFound && str[i] === '.') {
                //This email has an @ and dot in the right order.
                dotFound = true;
            }
            atFound = true;
        }
    }

    if (atFound && dotFound) {
        info.email = req.body.email;
    } else {
        if (!info.error.email) {
            info.error.email = [];
        }
        info.hasError = true;
        info.error.email.push({
            message: "email is malformed."
        });
    }
}

function checkRequired(info, req) {
    for (var item in req.body) {
        info[item] = req.body[item];
        if (req.body[item].length <= 0) {
            if (!info.error[item]) {
                info.error[item] = [];
            }
            info.hasError = true;
            info.error[item].push({
                message: item + " is required."
            });
        }
    }
}

// PRO-TIP: Write ALOT of functions to help you handle each little piece.


module.exports = router;
