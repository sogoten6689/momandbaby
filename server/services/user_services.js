'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger();
const Promise = require('bluebird');
const auth_utils = require('../config/auth_utils');
const models = require('../db/models');
const errors = require('../lib/errors');
const dateTime = require('node-datetime');

const Chatkit = require('@pusher/chatkit-server');
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * create chatkit.
 */
const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:d3b47aed-c439-4dc3-ae2a-06e6cf178edb',
    key: '0a4c726a-991e-4c9e-8ff0-02b715f115d7:R0cMAfGfDoNMkNi23hOUMz8dHCbyzs476CEd4ZKqxMA=',
});
exports.signup = function (fullname, account, password, address, email, facebook_account, twitter_account, phone, img_url) {
    return new Promise(function (resolve, reject) {
        models.User.findOne({
            attributes: ['email'],
            where: {
                $or: [
                    {
                        account:
                            {
                                $eq: account,
                            }
                    },
                    {
                        email:
                            {
                                $eq: email,
                            }
                    },

                ]
            }

        })
            .then(user => {
                if (user) {
                    throw {
                        message: errors.USER_01,
                        code: 'USER_01'
                    };
                }
                var dt = dateTime.create();
                var formatted = dt.format('Y-m-d H:M:S');
                return models.User.create({
                    created_at: formatted,
                    updated_ad:formatted,
                    account: account,
                    password: password,
                    fullname: fullname,
                    address: address,
                    phone: phone,
                    email: email,
                    facebook_account: facebook_account,
                    twitter_account: twitter_account,
                    image_url: img_url,
                    active: 1,
                });
            })
            .then(result => {
                if (result == null) {
                    throw {
                        message: errors.CREATE,
                        code: 'CREATE'
                    };
                }
                console.log(result.account);
                return chatkit.createUser({
                    id: String(result.id),
                    name: result.account,
                });
            })
            .then( result => {
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

exports.login = function (account, password) {
    return new Promise(function (resolve, reject) {
        models.User.findOne({
            where: {
                account: account,
                password: password,
            },
            attributes: ['id', 'account', 'fullname', 'image_url','active'],
            include: [
                {
                    model: models.Role,
                    required: false,
                    attributes: ['code', 'name']
                }
            ]
        })
            .then(user => {
                console.log("user ");
                console.log(user);
                if (user == null) {
                    throw {
                        message: errors.AUTHENTICATE_01,
                        code: 'AUTHENTICATE_01'
                    };
                }
                let resultData = {
                    id: user.id,
                    account: user.account,
                    fullname: user.fullname,
                    image_url: user.image_url,
                    active: user.active,
                    role: user.Role,
                };
                let token = auth_utils.getToken(resultData);
                resultData.token = token;

                user.last_login = new Date();
                return Promise.all([resultData, user.save()]);
            })
            .then(([resultData]) => {
                return resolve(resultData);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

exports.getUser = function (id) {
    return new Promise(function (resolve, reject) {
        models.User.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'account', 'fullname', 'address', 'phone', 'role_id', 'email',
                'facebook_account', 'twitter_account', 'image_url','active']
        })
            .then(user => {
                // t vo roi nha
                if (user == null) {
                    throw {
                        message: errors.USER_02,
                        code: 'USER_02'
                    };
                }
                return resolve(user);
            })
            .catch(error => {
                console.log(error);
                logger.error(error);
                return reject(error);
            });
    });
};

exports.updateUser = function (userId, fullname, address, phone,email, facebook_account, twitter_account, image_url,active) {
    return new Promise(function (resolve, reject) {
        console.log(userId);
        console.log(fullname);
        console.log(address);
        console.log(phone);
        console.log(facebook_account);
        console.log(twitter_account);
        console.log(image_url);
        console.log(active);
        models.User.findOne({
            attributes: ['email'],
            where: {
                id: userId
            }

        })
            .then(user => {
                console.log(user);
                if (user == null) {
                    throw {
                        message: errors.USER_02,
                        code: 'USER_02'
                    };
                }
                return models.User.update({
                    updated_at:new Date(),
                    last_login: new Date(),
                    fullname: fullname,
                    address: address,
                    phone: phone,
                    email: email,
                    facebook_account: facebook_account,
                    twitter_account: twitter_account,
                    image_url: image_url,
                    active: active
                },
                    {
                        where: { id: userId }
                    });
            })
            .then(result => {
                if (result == null) {
                    throw {
                        message: errors.UPDATE,
                        code: 'UPDATE'
                    };
                }
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

exports.getAllUsers = function () {
    return new Promise(function (resolve, reject) {
        models.User.findAll({
            attributes: ['id', 'account', 'fullname', 'address', 'phone',
                'role_id', 'email', 'facebook_account', 'twitter_account', 'image_url', 'active']
        })
            .then(result => {
                let users = result.map(user=>{
                   return{
                       id: user.id,
                    account: user.abort,
                    fullname: user.fullname,
                    address: user.address,
                    phone: user.phone,
                    role_id: user.role_id,
                    email: user.email,
                    facebook_account: user.facebook_account,
                    twitter_account: user.twitter_account,
                    img_url: user.image_url,
                    active: user.active

                   };
                });

                return resolve(users);
            })
            .catch(error => {
                console.log(error);
                logger.error(error);
                return reject(error);
            });
    });
};

exports.getUserByIdFb = function (id) {
    return new Promise(function (resolve, reject) {
        models.User.findOne({
            where: {
                facebook_account: id
            },
            attributes: ['id', 'account', 'fullname', 'address', 'phone', 'role_id', 'email', 'facebook_account',
                'twitter_account', 'image_url','active'],
            include: [
                {
                    model: models.Role,
                    required: false,
                    attributes: ['code', 'name']
                }
            ]
        })
            .then(user => {
                // t vo roi nha
                if (user == null) {
                    throw {
                        message: errors.USER_02,
                        code: 'USER_02'
                    };
                }
                let resultData = {
                    id: user.id,
                    account: user.account,
                    fullname: user.fullname,
                    role: user.Role,
                    img_url: user.image_url,
                    active: user.active

                };
                let token = auth_utils.getToken(resultData);
                resultData.token = token;

                user.last_login = new Date();
                return Promise.all([resultData, user.save()]);

            })
            .then(([resultData]) => {
                return resolve(resultData);
            })
            .catch(error => {
                console.log(error);
                logger.error(error);
                return reject(error);
            });
    });
};

exports.getUserByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        models.User.findOne({
            where: {
                email: email
            },
            attributes: ['id', 'account', 'fullname', 'address', 'phone', 'role_id',
                'email', 'facebook_account', 'twitter_account', 'image_url','active'],
            include: [
                {
                    model: models.Role,
                    required: false,
                    attributes: ['code', 'name']
                }
            ]
        })
            .then(user => {
                // t vo roi nha
                if (user == null) {
                    throw {
                        message: errors.USER_02,
                        code: 'USER_02'
                    };
                }
                let resultData = {
                    id: user.id,
                    account: user.account,
                    fullname: user.fullname,
                    role: user.Role,
                    img_url: user.image_url,
                    active: user.active
                };
                let token = auth_utils.getToken(resultData);
                resultData.token = token;

                user.last_login = new Date();
                return Promise.all([resultData, user.save()]);

            })
            .then(([resultData]) => {
                return resolve(resultData);
            })
            .catch(error => {
                console.log(error);
                logger.error(error);
                return reject(error);
            });
    });
};

exports.changepassword = function (userId, passold,passnew) {
    return new Promise(function (resolve, reject) {
        console.log(userId);
        models.User.findOne({
            attributes: ['password'],
            where: {
                password: passold,
                id: userId
            }

        })
            .then(user => {
                console.log(user);
                if (user == null) {
                    throw {
                        message: errors.USER_02,
                        code: 'USER_02'
                    };
                }
                return models.User.update({
                        updated_at:new Date(),
                        password: passnew
                    },
                    {
                        where: { id: userId }
                    });
            })
            .then(result => {
                if (result == null) {
                    throw {
                        message: errors.UPDATE,
                        code: 'UPDATE'
                    };
                }
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};


exports.updateImage = function (userId, img_url) {
    return new Promise(function (resolve, reject) {
        console.log(userId);
        models.User.findOne({
            attributes: ['id'],
            where: {
                id: userId
            }

        })
            .then(user => {
                console.log(user);
                if (user == null) {
                    throw {
                        message: errors.USER_02,
                        code: 'USER_02'
                    };
                }
                return models.User.update({
                        updated_at:new Date(),
                        image_url: img_url
                    },
                    {
                        where: { id: userId }
                    });
            })
            .then(result => {
                if (result == null) {
                    throw {
                        message: errors.UPDATE,
                        code: 'UPDATE'
                    };
                }
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

exports.updateActive = function (userId, numberUp) {
    return new Promise(function (resolve, reject) {
        console.log(userId);
        models.User.findOne({
            attributes: ['id','active'],
            where: {
                id: userId
            }

        })
            .then(user => {
                console.log(user);
                if (user == null) {
                    throw {
                        message: errors.USER_02,
                        code: 'USER_02'
                    };
                }
                return models.User.update({
                        updated_at:new Date(),
                        active: numberUp
                    },
                    {
                        where: { id: userId }
                    });
            })
            .then(result => {
                if (result == null) {
                    throw {
                        message: errors.UPDATE,
                        code: 'UPDATE'
                    };
                }
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};
