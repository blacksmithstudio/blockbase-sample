/**
 * User Example model
 * @namespace app.models.user
 * @author Alexandre Pereira <alex@blacksmith.studio>
 * @param {Object} app - app namespace to update
 *
 * @returns {Object} model
 */
module.exports = (app) => {
    const Model = app.models._model

    return class User extends Model {
        /**
         * main constructor
         * @param {Object} data - data to param the model
         */
        constructor(data) {
            super({ type: 'user' })

            if (data)
                this.data = data
        }

        /**
         * list the users
         * @memberof app.models.user
         * @returns {[]} - array of users
         */
        async list(){
            try{
                let results = await this.queryBuilder().orderBy('created_at', 'desc')
                return results.map(r => new User(r))
            } catch(e){ throw e }
        }
    }
}
