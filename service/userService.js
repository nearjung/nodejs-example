var db_sql = require('../configuration/database/db_sql');
const Sequelize = require('sequelize');
var syuser = require('../model/syuser');
const log = require('../configuration/log/log');
const dbManager = require('./dbManager');

class getService {
    async getUser(email) {
        try {
            if (email) {
                const result = await syuser.findOne({
                    where: { email: email }
                }).catch(err => {
                    throw err;
                });
                return result;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
            log.error(err.stack);
            return false;
        }
    }
}

class saveService {
    async saveUser(parameter) {
        try {
            if (parameter) {
                const getUser = await syuser.findOne({ where: { email: parameter.email } }).catch(err => {
                    throw err;
                });

                if (getUser) {
                    if (parameter.firstPage) { // กรณีที่มี user อยู่แล้ว และมาจากหน้าแรก ให้ส่งค่ากลับไปเลย
                        return getUser;
                    }
                    delete parameter.createBy;
                    delete parameter.createDate;
                }

                var where = {};
                where.email = parameter.email;
                where.active = 'Y';
                const result = await dbManager.createOrUpdate(syuser, parameter, where).catch(err => {
                    throw err;
                });
                return result;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
            log.error(err.stack);
            return false;
        }
    }
}

module.exports = { getService, saveService }