'use strict';

const express = require('express');
const router = express.Router();
//const Joi = require('joi');
//const validations = require('../validations/signup');
const ev = require('express-validation');

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

router.post('/', function(req, res) {
    let signInfo = checkSignIn(req);
    // Handle rendering / redirecting here.
    // If there arent any validation errors, redirect to '/'
    if (!signInfo.hasError) {
        res.redirect('/');
    } else {
        res.render('signup', signInfo);
    }
});
//function to rule all functions
function checkSignIn(req) {
    var info = {};
    info.hasError = false;
    info.error = {};

    //Required Checks
    checkUsername(info, req);
    checkEmail(info, req);
    checkPasswordLength(info, req);
    checkPhone(info, req);
    checkRequired(info, req);

    return info;
}

function checkUsername(info, req) {
    let username = req.body.username;
    let start = /^[A-Za-z]/;
    // Username: Required. Must be more than 6 characters
    if (username.length > 6) {
        // info.username = req.body.username;
    } else {
        if (!info.error.username) {
            info.error.username = [];
        }
        info.hasError = true;
        info.error.username.push({
            message: "username must be more than 6 characters"
        });
    }
    //console.log(req.body.username);
    // // Username: must start with a letter,
    if (username.match(start)) {
        return true;
    } else {
        if (!info.error.username) {
            info.error.username = [];
        }
        info.hasError = true;
        info.error.username.push({
            message: "username must start with a letter"
        });
    }
    // //Username: no punctuation.
    if (username.match(/^\w+$/)) {
        return true;
    } else {
        if (!info.error.username) {
            infor.error.username = [];
        }
        info.hasError = true;
        info.error.username.push({
            message: "username must NOT contain punctuation"
        })
    }
}

// Email: Required. Must be formatted like an email, (something @ something . something)
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
            message: "please insert a valid email"
        });
    }
}
// Password: Required. Must be more than 8 characters with atleast One letter, one number, and one special character (!?/.,')
function checkPasswordLength(info, req) {
    let password = req.body.password;
    if (password.length > 8) {

    } else {
        if (!info.error.password) {
            info.error.password = [];
        }
        info.hasError = true;
        info.error.password.push({
            message: "password must be 8 characters long"
        });
    }
}


// Phone Number: Required. Must be a 10 digit number formatted like: 999-888-9898
function checkPhone(info, req) {
    var phone = req.body.phoneNumber;
    console.log(req.body);
    //let rex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.match(/^\d{3}\-?\d{3}\-?\d{4}$/)) {
        info.phone = req.body.phoneNumber;
    } else {
        if (!info.error.phoneNumber) {
            info.error.phoneNumber = [];
        }
        info.hasError = true;
        info.error.phoneNumber.push({
            message: "Format as 999-999-9999."
        })
    }
}
// First Name: Required.
// Last Name: Required.

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
module.exports = router;
