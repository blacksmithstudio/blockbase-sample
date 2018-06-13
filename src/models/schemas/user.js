const Joi = require('joi')
const moment = require('moment')

/**
 * User validation schema (with Joi)
 * @author Alexandre Pereira <code@blacksmith.studio>
 * @returns {Object} Joi schema
 */
module.exports = Joi.object().keys({
    id         : Joi.number().integer(),
    firstname  : Joi.string().max(128),
    lastname   : Joi.string().max(128),
    email      : Joi.string().max(128).when('id', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
    password   : Joi.string().max(1024).when('id', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
    logged_at  : Joi.date().timestamp().default(() => moment().format('YYYY-MM-DD HH:MM:SS'), 'last logged in'),
    created_at : Joi.date().timestamp().when('id', { is: Joi.number().integer(), then: Joi.optional(), otherwise: Joi.default(() => moment().format('YYYY-MM-DD HH:MM:SS'), 'date created') }),
    updated_at : Joi.date().timestamp().when('id', { is: Joi.number().integer(), then: Joi.optional(), otherwise: Joi.default(() => moment().format('YYYY-MM-DD HH:MM:SS'), 'date updated') })
})