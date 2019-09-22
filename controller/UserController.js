
//=========================================================================================================================
//                                                                                                                         
//  ##   ##   ####  #####  #####     ####   #####   ##     ##  ######  #####     #####   ##      ##      #####  #####    
//  ##   ##  ##     ##     ##  ##   ##     ##   ##  ####   ##    ##    ##  ##   ##   ##  ##      ##      ##     ##  ##   
//  ##   ##   ###   #####  #####    ##     ##   ##  ##  ## ##    ##    #####    ##   ##  ##      ##      #####  #####    
//  ##   ##     ##  ##     ##  ##   ##     ##   ##  ##    ###    ##    ##  ##   ##   ##  ##      ##      ##     ##  ##   
//   #####   ####   #####  ##   ##   ####   #####   ##     ##    ##    ##   ##   #####   ######  ######  #####  ##   ##  
//                                                                                                                         
//=========================================================================================================================


const express = require('express');
const router = express.Router();
const _ = require('lodash');
const UserService = require('../service/UserService')

//CRUD Operations:

// Add a user to data base
router.post('/create', (req, res, next) => {
    if(!_.isUndefined(req.body.firstName) && (!_.isUndefined(req.body.lastName)) && (!_.isUndefined(req.body.email))
    && (!_.isUndefined(req.body.mobile)) && (!_.isUndefined(req.body.password)) ) {
        return UserService.add(req, res);
    } else {
        return res.json({ success: false, msg: 'Restricted condition: Mandatory fields firstName/lastName/email/mobilepassword is missing' })
    }
});

// Retrieve one particular user
router.post('/getone', (req, res, next) => {
	if((!_.isUndefined(req.body.email))) {
        return UserService.getUser(req, res);
    } else {
        return res.json({ success: false, msg: 'Restricted condition: Mandatory fields email/password is missing' })
    }
});

// Retrieve all the users
router.get('/getall', (req, res, next) => {
	return UserService.getAllUsers(req, res);
});

/**
 * Update one user's info, excluding
 * email, where it is unqiue identifier &
 * password, make an API for password updation, which avoids choas
 */
router.post('/update', (req, res, next) => {
    if(!_.isUndefined(req.body.conditions.email) ) {
        delete req.body.updateFields.password;
        return UserService.update(req, res);
    } else {
        return res.json({ success: false, msg: 'Restricted condition: Mandatory fields firstName/lastName/email/mobilepassword is missing' })
    }
});

/**
 * Best practice of deletion is,
 * Soft delete, by maintaining a flag named isDeleted in auditFields
 */
router.get('/delete/:email', (req, res, next) => {
	if(!_.isUndefined(req.params.email) ) {
        return UserService.delete(req, res);
    } else {
        return res.json({ success: false, msg: 'Restricted condition: Mandatory field email is missing' })
    }
});


module.exports = router;