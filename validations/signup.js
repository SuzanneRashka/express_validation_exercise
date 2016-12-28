'use strict';

const Joi = require('joi');

module.exports.post = {
    body: {
        username: Joi.string()
            .label('Username')
            .required()
            .min(6)
            .regex(/^[A-z].*$/)
            .trim()
            .alphanum(),

        password: Joi.string()
            .label('Password')
            .required()
            .min(8)
            .regex(/[A-z]/)
            .regex(/[0-9]/)
            .regex(/[!?/.,']/),

        email: Joi.string()
            .label('Email')
            .required()
            .trim()
            .email(),

        firstName: Joi.string()
            .label('First Name')
            .required(),

        lastName: Joi.string()
            .label('Last Name')
            .required(),

        phoneNumber: Joi.string()
            .label('Phone Number')
            .regex(/[0-9]{3}-[0-9]{3}-[0-9]{4}/)
            .required()

    }
};
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
