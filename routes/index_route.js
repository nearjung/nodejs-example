var express = require('express');
var router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect'); // Authentication
var syuser = require('../model/syuser');
const userService = require('../service/userService');

// Authentication
router.get('/', (req, res) => {
    // res.send(req.oidc.isAuthenticated() ? 'Welcome to think api' : 'Your unable to use this.');
    if (req.oidc.isAuthenticated()) {
        res.render('index');

        const saveService = new userService.saveService();
        var userInformation = req.oidc.user;
        var obj = {};
        obj.username = userInformation.sub.split("|")[1];
        obj.email = userInformation.email;
        obj.name = userInformation.name;
        obj.picture = userInformation.picture;
        obj.active = 'Y';
        obj.createBy = userInformation.sub.split("|")[1];
        obj.createDate = new Date();
        obj.updateBy = userInformation.sub.split("|")[1];
        obj.updateDate = new Date();
        obj.firstPage = true;
        saveService.saveUser(obj);
    } else {
        res.render('404');
    }
});
router.get('/authprofile', requiresAuth(), (req, res) => {
    res.send(req.oidc.user);
});

// router.get('/', function(req, res, next) {
//     var io = req.app.get('io')
//     res.render('index', { title: 'HM HOSMERGE Service REST API' });
// });

module.exports = router;
