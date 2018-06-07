const fs = require('fs')
const Knex = require('knex')

/**
 * Blockbase Sample Init Script
 * @author Alexandre Pereira <alex@blacksmith.studio>
 */

const blockbase = require('@blacksmithstudio/blockbase')

blockbase({ root : `${__dirname}/../../src/` }, async (app) => {
    const Config = app.config 
    const Logger = app.drivers.logger

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

    Logger.success('Blockbase Sample | Setup', 'finished !!')   
    process.exit() 
})