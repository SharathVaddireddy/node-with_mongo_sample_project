//================================================================================
//                                                                                
//  ##   ##   ####  #####  #####    ###    ###   #####   ####    #####  ##      
//  ##   ##  ##     ##     ##  ##   ## #  # ##  ##   ##  ##  ##  ##     ##      
//  ##   ##   ###   #####  #####    ##  ##  ##  ##   ##  ##  ##  #####  ##      
//  ##   ##     ##  ##     ##  ##   ##      ##  ##   ##  ##  ##  ##     ##      
//   #####   ####   #####  ##   ##  ##      ##   #####   ####    #####  ######  
//                                                                                
//================================================================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
// const Constants = require('../config/Constants');
var _ = require('lodash');
//
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    auditFields: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }

});

const User = module.exports = mongoose.model('UserModel', UserSchema);

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getOne = function (condition, callback) {
    condition['auditFields.isDeleted'] = false;
    User.findOne(condition, callback);
}

module.exports.getAll = function (callback) {
    // Sorting with latest updated as first
    User.find(callback).sort('-auditFields.updatedAt');
}

module.exports.updateUser = function (conditions, updateFields, callback) {
    _.isUndefined(updateFields.auditFields)? updateFields['auditFields.updatedAt'] = new Date() : null
    User.update(conditions, {
        $set: updateFields,
    }, function (err, out) {
        if (err) {
            callback(err, null)
        } else if (out.nModified <= 0) {
            callback("Data not updated", null);
        }
        else {
            callback(null, out)
        }
    });
}
