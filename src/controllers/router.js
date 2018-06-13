/**
 * Router controller
 * @namespace app.controllers.router
 * @author Alexandre Pereira <code@blacksmith.studio>
 * @param {Object} app - app namespace to update
 *
 * @returns {Object} controller
 */
module.exports = (app) => {
    const Logger = app.drivers.logger
    const Config = app.config

    const User = app.models.user
    
    return {
        /**
         * auth (login / signup) a user
         * @memberof app.controllers.user.auth
         * @param {[*]} req - express req object
         * @param {[*]} res - express res object
         */
        async users(req, res){            
            try{
                let users = await new User().queryBuilder.orderBy('created_at', 'desc')
                res.render(`${app.root}/views/users.twig`, { Config, users })
            } catch(error){
                Logger.error('List Users', error)
                res.status(500).send({ error })
            }
        }
    }
}
