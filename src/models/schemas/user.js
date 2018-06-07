const Joi = require('joi')
const moment = require('moment')

/**
 * User validation schema (with Joi)
 * @author Alexandre Pereira <alex@blacksmith.studio>
 * @returns {Object} Joi schema
 */
module.exports = Joi.object().keys({
    id         : Joi.number().integer(),
    firstname  : Joi.string().max(128),
    lastname   : Joi.string().max(128),
    email      : Joi.string().max(128),
    logged_at  : Joi.date().timestamp().default(() => moment().unix(), 'last logged in'),
    created_at : Joi.date().timestamp().default(() => moment().unix(), 'date created'),
    updated_at : Joi.date().timestamp().default(() => moment().unix(), 'date updated'),
})
