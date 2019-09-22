//======================================================================================
//                                                                                      
//  ##   ##   ####  #####  #####     ####  #####  #####    ##   ##  ##   ####  #####  
//  ##   ##  ##     ##     ##  ##   ##     ##     ##  ##   ##   ##  ##  ##     ##     
//  ##   ##   ###   #####  #####     ###   #####  #####    ##   ##  ##  ##     #####  
//  ##   ##     ##  ##     ##  ##      ##  ##     ##  ##    ## ##   ##  ##     ##     
//   #####   ####   #####  ##   ##  ####   #####  ##   ##    ###    ##   ####  #####  
//                                                                                      
//======================================================================================


const UserModel = require('../model/UserModel');
const _ = require('lodash');
const Constants = require('../config/Constants')


module.exports.add = function (req, res) {
    UserModel.getOne({ email: { $eq: req.body.email } }, (err, result) => {
        if (err) {
            res.json({
                success: Constants.BOOLEAN.FALSE,
                msg: 'Failed to register user',
                data: err.toString()
            });
        } else if (result) {
            res.json({
                success: Constants.BOOLEAN.FALSE,
                msg: 'User already exists. Please try to login'
            });
        } else {
            UserModel.addUser(prepareUser(req), (err, user) => {
                if (err) {
                    res.json({
                        success: Constants.BOOLEAN.FALSE,
                        msg: 'Failed to register user',
                        data: err.toString()
                    });
                } else {
                    //Following best practice to exclude passwords in the response.
                    delete user._doc.password;
                    res.json({
                        success: Constants,
                        msg: 'User registered',
                        data: user
                    });
                }
            });
        }
    });
}

module.exports.getUser = function (req, res) {
    var conditions = {
        "email": req.body.email
    }
    UserModel.getOne(conditions, (err, user) => {
        if (err) {
            res.json({
                success: Constants.BOOLEAN.FALSE,
                msg: 'Failed to get user',
                data: err.toString()
            });
        } else {
            /**
             *  Following best practice to exclude passwords in the response,
             *  which is handled at schema defination.
             * */
            res.json({
                success: Constants.BOOLEAN.TRUE,
                data: user
            });
        }
    });
}

module.exports.getAllUsers = function (req, res) {
    //Instead of getting all the users, Pagination can be done here.
    UserModel.getAll((err, users) => {
        if (err) {
            res.json({
                success: Constants.BOOLEAN.FALSE,
                msg: 'Failed to get user',
                data: err.toString()
            });
        } else if (users) {
            res.json({
                success: Constants.BOOLEAN.TRUE,
                data: users
            });
        } else {
            res.json({
                success: Constants.BOOLEAN.FALSE,
                msg: 'No data found'
            });
        }
    });
}

module.exports.update = function (req, res) {
    var conditions = {
        email: req.body.conditions.email
    }
    UserModel.updateUser(conditions, req.body.updateFields, (err, isUpdated) => {
        if (err) {
            res.json({
                success: Constants.BOOLEAN.FALSE,
                msg: 'Failed to get user',
                data: err.toString()
            });
        } else if (isUpdated) {
            res.json({
                success: Constants.BOOLEAN.TRUE,
                data: isUpdated
            });
        }
    });
}

module.exports.delete = function (req, res) {
    var condition = {
        email: req.params.email,
        'auditFields.isDeleted': Constants.BOOLEAN.FALSE
    }
    UserModel.getOne(condition, (err, user) => {
        if (err) {
            res.json({
                success: Constants.BOOLEAN.FALSE,
                msg: 'Failed to get user',
                data: err.toString()
            });
        } else if (user) {
            var updateFields = {};
            updateFields['auditFields.isDeleted'] = Constants.BOOLEAN.TRUE;
            UserModel.updateUser(condition, updateFields, (err, isUpdated) => {
                if (err) {
                    res.json({
                        success: Constants.BOOLEAN.FALSE,
                        msg: 'Failed to delete user',
                        data: err.toString()
                    });
                } else if (isUpdated) {
                    res.json({
                        success: Constants.BOOLEAN.TRUE,
                        msg: 'Successfully soft deleted user.',
                    });
                }
            });
        } else {
            res.json({
                success: Constants.BOOLEAN.FALSE,
                msg: 'No user foud with this email'
            });
        }
    });
}


var prepareUser = function (req) {
    //auditFields are assigned with default values as setted in UserModel
    var newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    });
    return newUser;
};