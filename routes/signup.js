'use strict';

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validations = require('../validations/signup');
const ev = require('express-validation');

// Write your form and validations inside this route file.


// Add form validations in /signup for:
// Username: Required. Must be more than 6 characters, must start with a letter, and no punctuation.
// Password: Required. Must be more than 8 characters with atleast One letter, one number, and one special character (!?/.,')//
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

router.post('/', ev(validations.post), function(req, res) {
    // Handle rendering / redirecting here.

    // If there arent any validation errors, redirect to '/'

    // If there are validation errors, re-render the signup page, injecting the users previous inputs.
    res.render('signup', req.post);

});


// PRO-TIP: Write ALOT of functions to help you handle each little piece.


module.exports = router;
