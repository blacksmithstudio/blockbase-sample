const CryptoJS = require('crypto-js')

/**
 * Tokenizer Driver Custom
 * @namespace app.drivers.tokenizer
 * @author Alexandre Pereira <code@blacksmith.studio>
 * @param {Object} app - app namespace to update
 *
 * @returns {Object} controller
 */
module.exports = (app) => {
    const Config = app.config
    
    return {
        /**
         * get token from express req object
         * @memberof app.drivers.tokenizer
         * @param {[*]} req 
         * @returns token || null
         */
        getToken(req){
            if(!req.header('Authorization') || !req.header('Authorization').includes('Bearer '))
                return null
            
            return req.header('Authorization').split('Bearer ')[1]
        },

        /**
         * encrypt the token
         * @memberof app.drivers.tokenizer
         * @param {[*]} obj - object to stringify and transform in token
         * @returns {object} data
         */
        encrypt(obj){
            let text = JSON.stringify({ id, email, created_at })
            return CryptoJS.AES.encrypt(text, Config.crypto_key).toString()
        },

        /**
         * decrypt the token
         * @memberof app.drivers.tokenizer
         * @param {string} token 
         * @returns {object} data
         */
        decrypt(token){
            let bytes  = CryptoJS.AES.decrypt(token.toString(), Config.crypto_key)
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        }
    }
}
