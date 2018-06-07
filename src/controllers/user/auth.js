const bcrypt = require('bcrypt')
const CryptoJS = require('crypto-js')

/**
 * Auth Example controller
 * @namespace app.controllers.auth
 * @author Alexandre Pereira <alex@blacksmith.studio>
 * @param {Object} app - app namespace to update
 *
 * @returns {Object} controller
 */
module.exports = (app) => {
    const Config = app.config

    const Logger = app.drivers.logger
    const Tokenizer = app.drivers.Tokenizer
    
    const User = app.models.user
    
    return {
        /**
         * auth (login / signup) a user
         * @memberof app.controllers.user
         * @param {[*]} req - express req object
         * @param {[*]} res - express res object
         */
        async log(req, res){
            const { email, password } = req.body
            
            try{
                let results = new User().queryBuilder.where('email', email)
                let user = new User(!results.length ? { email, password : bcrypt.hashSync(password, 10) } : results[0])

                if(!results.length && password)
                    user = await user.save()
                
                let { id, email, created_at } = user.data
                let token = Tokenizer.encrypt({ id, email, created_at })

                res.status(201).send({ user : user.expose('private'), token })
            } catch(error){
                Logger.error('User Auth', error)
                res.status(500).send({ error })
            }
        }
    }
}
