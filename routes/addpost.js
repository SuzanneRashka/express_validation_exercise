'use strict';

var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('add_post', {
        hasError: false,
        title: '',
        author: '',
        email: '',
        description: ''
    });
});
router.post('/', function(req, res) {

    var postInfo = checkPost(req); // Run error checking.

    if (!postInfo.hasError) {
        // Validations passed -- Submit into database and redirect.
        res.redirect('/');
    } else {
        res.render('add_post', postInfo);
    }
});

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


module.exports = router;
