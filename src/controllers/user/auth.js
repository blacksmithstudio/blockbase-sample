const bcrypt = require('bcrypt')

/**
 * Auth Example controller
 * @namespace app.controllers.auth
 * @author Alexandre Pereira <code@blacksmith.studio>
 * @param {Object} app - app namespace to update
 *
 * @returns {Object} controller
 */
module.exports = (app) => {
    const Config = app.config

    const Logger = app.drivers.logger
    const Tokenizer = app.drivers.tokenizer
    
    const User = app.models.user
    
    return {
        /**
         * auth (login / signup) a user
         * @memberof app.controllers.user.auth
         * @param {[*]} req - express req object
         * @param {[*]} res - express res object
         */
        async log(req, res){
            const { email, password } = req.body
            
            try{
                let results = await new User().queryBuilder.where('email', email)
                let user = new User(!results.length ? { email, password : bcrypt.hashSync(password, 10) } : results[0])

                if(!results.length && password)
                    user = await user.save()

                if(results.length && !bcrypt.compareSync(password, user.data.password))
                    return res.status(403).send({ error : 'Wrong login or password' })
                
                let token = Tokenizer.encrypt({ 
                    id : user.data.id,
                    email : user.data.email,
                    created_at : user.data.created_at
                })

                res.status(201).send({ user : user.expose('private'), token })
            } catch(error){
                Logger.error('User Auth', error)
                res.status(500).send({ error })
            }
        }
    }
}
