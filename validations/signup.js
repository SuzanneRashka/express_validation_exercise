'use strict';

const Joi = require('joi');

module.exports.post = {
    body: {
        username: Joi.string()
            .label('Username')
            .required()
            .min(6)
            .regex(/^[A-Za-z].*$/)
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
}
