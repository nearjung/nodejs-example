const config = {
    app: {
        version: '1.0.0',
        port: 9000,
        metricsPort: 9001,
        ssl: false
    },

    db: {
        cfg_db_type: "mysql",
        cfg_db_host: "103.13.30.185",
        cfg_db_user: "root",
        cfg_db_pwd: "P@ssw0rd",
        cfg_MAX_POOL: 10,
        cfg_MIN_POOL: 0,
        cfg_IDLE: 10000,
        port: 3306,
        cfg_db_name: "example",
        logging: false,
    },

    log: {
        fileName: 'log/Log.log',
        level: 'debug'
    }
}

module.exports = config;