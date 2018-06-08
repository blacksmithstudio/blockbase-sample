const CryptoJS = require('crypto-js')

/**
 * Crud Example controller
 * @namespace app.controllers.user.crud
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
         * create a user
         * @memberof app.controllers.user.crud
         * @param {[*]} req - express req object
         * @param {[*]} res - express res object
         */
        async create(req, res){
            let { firstname, lastname, email } = req.body

            try{
                let user = new User({ firstname, lastname, email })

                user = await user.save()
                res.status(201).send(user.expose('private'))
            } catch(error){
                Logger.error('Create User', error)
                res.status(500).send({ error })
            }
        },

        /**
         * get a user
         * @memberof app.controllers.user.crud
         * @param {[*]} req - express req object
         * @param {[*]} res - express res object
         */
        async read(req, res){
            let { id } = req.params
            let token = Tokenizer.getToken(req)
            let decrypted = token ? Tokenizer.decrypt(token) : null

            try{
                let user = new User({ id })
                user = await user.read()

                res.status(200).send(user.expose((decrypted && decrypted.id == id) ? 'private' : 'public'))
            } catch(error) {
                Logger.error('Read User', error)
                res.status(500).send({ error })
            }
        },

        /**
         * update a user
         * @memberof app.controllers.user.crud
         * @param {[*]} req - express req object
         * @param {[*]} res - express res object
         */
        async update(req, res){
            let data = Object.assign({}, req.body)
            let token = Tokenizer.getToken(req)
            let decrypted = token ? Tokenizer.decrypt(token) : null

            if(!token || !decrypted.id)
                return res.status(403).send({ error : `Access forbidden` })
            if(data.id != decrypted.id)
                return res.status(403).send({ error : `You can't edit this user` })

            try{
                let user = new User(data)

                if(!user.valid())
                    return res.status(422).send(user.validate())
                
                user = await user.update()
                res.status(200).send(user.expose('private'))
            }catch(error) {
                Logger.error('Read User', error)
                res.status(500).send({ error })
            }
        },

        /**
         * delete a user
         * @memberof app.controllers.user.crud
         * @param {[*]} req - express req object
         * @param {[*]} res - express res object
         */
        async delete(req, res){
            const { id } = req.params
            let token = Tokenizer.getToken(req)
            let decrypted = token ? Tokenizer.decrypt(token) : null

            if(!token || !decrypted.id)
                return res.status(403).send({ error : `Access forbidden` })
            if(id != decrypted.id)
                return res.status(403).send({ error : `You can't delete this user` })

            try{
                let user = new User({ id })
                let deleted = await user.delete()

                res.status(200).send({ deleted })
            } catch(error){
                Logger.error('Delete User', error)
                res.status(500).send({ error })
            }
        },

        /**
         * list the users
         * @memberof app.controllers.user.crud
         * @param {[*]} req - express req object
         * @param {[*]} res - express res object
         */
        async list(req, res){
            try{
                let users = await new User().list()

                res.status(201).send(users.map(u => u.expose('private')))
            } catch(error){
                Logger.error('List Users', error)
                res.status(500).send({ error })
            }
        }
    }
}
