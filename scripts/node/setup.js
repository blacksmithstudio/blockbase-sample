const fs = require('fs')
const Knex = require('knex')
const bcrypt = require('bcrypt')

/**
 * Blockbase Sample Init Script
 * @author Alexandre Pereira <code@blacksmith.studio>
 */

const blockbase = require('blockbase')

blockbase({ root : `${__dirname}/../../src/` }, async (app) => {
    const Config = app.config 
    const Logger = app.drivers.logger

    const User = app.models.user

    Logger.warn('Blockbase Sample | Setup', 'starting... initializing database')

    let knex = Knex({
        client: 'mysql',
        connection: {
            host : Config.mysql.host,
            user : Config.mysql.user,
            password : Config.mysql.password
        }
    })

    Logger.warn('Blockbase Sample | Setup', `creating database "${Config.mysql.database}"`)
    await knex.raw(`CREATE DATABASE IF NOT EXISTS ${Config.mysql.database}`)

    knex = Knex({
        client: 'mysql',
        connection: {
            host : Config.mysql.host,
            user : Config.mysql.user,
            password : Config.mysql.password,
            database : Config.mysql.database
        }
    })

    const schema = fs.readFileSync(`${__dirname}/../mysql/schema.sql`).toString()
    Logger.warn('Blockbase Sample | Setup', `loading SQL schema in "${Config.mysql.database}"`)
    await knex.raw(schema)

    let user = new User({
        firstname : 'John',
        lastname : 'Doe',
        email : 'john@doe.com',
        password : bcrypt.hashSync('1234', 10)
    })
    await user.save()

    Logger.success('Blockbase Sample | Setup', 'finished !!')   
    process.exit() 
})