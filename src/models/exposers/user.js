/**
 * User Exposer system for models
 * @author Alexandre Pereira <code@blacksmith.studio>
 *
 * @returns {Object} exposer
 */
module.exports = {
    'public': [
        'id',
        'firstname',
        'lastname',
    ],

    'private': [
        'id',
        'firstname',
        'lastname',
        'email',
        'logged_at',
        'created_at',
        'updated_at'
    ]
}
