var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const syuser = db.define('syuser', {
    userId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER, allowNull: true },
    username: { type: Sequelize.STRING(50), allowNull: true },
    email: { type: Sequelize.STRING(200), allowNull: true },
    name: { type: Sequelize.STRING(200), allowNull: true },
    picture: { type: Sequelize.STRING(255), allowNull: true },
    active: { type: Sequelize.STRING(1), allowNull: true },
    remark: { type: Sequelize.TEXT, allowNull: true },
    createDate: { type: Sequelize.DATE, allowNull: true },
    createBy: { type: Sequelize.STRING(50), allowNull: true },
    updateDate: { type: Sequelize.DATE, allowNull: true },
    updateBy: { type: Sequelize.STRING(50), allowNull: true },
}, { tableName: 'syuser' }); module.exports = syuser;
