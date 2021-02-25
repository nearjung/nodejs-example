var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const Op = Sequelize.Op;
var syuser = require('../../model/syuser');

// Services
const userService = require('../../service/userService');

const save = async (req, res, next) => {
    try {
        var parameter = req.body.parameter;

        const saveService = new userService.saveService();
        const result = await saveService.saveUser(parameter);

        if (result) {
            serviceResult.value = result;
            serviceResult.code = 200;
            serviceResult.status = "Success";
            serviceResult.text = "Save Success";
            res.json(serviceResult);
        } else {
            serviceResult.code = 500;
            serviceResult.status = "Error";
            serviceResult.text = "Error: Can't save user information.";
            res.json(serviceResult);
        }

    } catch (err) {
        console.error(err);
        log.error(err.stack);
        serviceResult.code = 500;
        serviceResult.status = "Error";
        serviceResult.text = "Error: " + err.message;
        res.json(serviceResult);
    }
}

module.exports = { save }