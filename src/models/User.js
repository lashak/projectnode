const { Model } = require('objection');
const Db = require('../config/knex');
Model.knex(Db);
class User extends Model {
    static get tableName() {
        return 'logins';
    }
    static get idColumn() {
        return 'lid';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                lid: { type: 'integer'},
                username: {type: 'varchar'},
                pwd: {type: 'text'},
                location: {type: 'text'}
            }
        };
    }
} 
module.exports = User;
