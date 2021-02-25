var config = require('../config');
var Sequelize = require('sequelize');
const db_sql = new Sequelize(config.db.cfg_db_name, config.db.cfg_db_user, config.db.cfg_db_pwd, {
    host: config.db.cfg_db_host,
    dialect: config.db.cfg_db_type,
    port: config.db.port,
    database: config.db.cfg_db_name,
    timezone: '+07:00',
    logging: config.db.logging,
    freezeTableName: 1,
    operatorsAliases: 0,
    pool: {
        max: config.db.cfg_MAX_POOL,
        min: config.db.cfg_MIN_POOL,
        idle: config.db.cfg_IDLE
    },
    define: {
        timestamps: 0,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
});


module.exports = db_sql;

