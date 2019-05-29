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

exports.getListRoom = function () {
    return new Promise(function (resolve, reject) {
        chatkit.getRooms()
        .then(rooms => {
            return resolve(rooms);
        })
        .catch(err => {
            return reject(err);
        })
    });
    
}

exports.getListRoomOfUser = function (userId) {
    return new Promise(function (resolve, reject) {
        chatkit.getUserRooms({
            userId: userId
        })
        .then(rooms => {
            return resolve(rooms);
        })
        .catch(err => {
            return reject(err);
        })
    });

}
exports.getListUsers = function () {
    return new Promise(function (resolve, reject) {
        chatkit.getUsers({})
            .then(users => {
                return resolve(users);
            })
            .catch(err => {
                return reject(err);
            })
    });

}

exports.createUser = function (id, username) {
    chatkit
        .createUser({
          id: id,
          name: username,
        })
        .then(() => {
          res.sendStatus(201);
        })
        .catch(err => {
          if (err.error === 'services/chatkit/user_already_exists') {
            res.sendStatus(200);
          } else {
            res.status(err.status).json(err);
          }
        });
}

exports.addUserIntoRoom = function (roomId, l) {
    // chatkit.addUsersToRoom({
    //     roomId: room.id,
    //     userIds: ['alice', 'bob']
    // })
    //     .then(() => console.log('added'))
    //     .catch(err => console.error(err))
}

exports.auth = function(userId){
    return new Promise(function (resolve, reject) {
        const authData = chatkit.authenticate({
            userId: userId,
        });
        console.log(authData.body);
        return resolve(authData.body);
        //res.status(authData.status).send(authData.body);
    });

}

exports.createRoom = function(userId, name,listUsersId){
    console.log(listUsersId);
    return new Promise(function (resolve, reject) {
        chatkit.createRoom({
            creatorId: userId,
            name: name,
            //userIds: ["Test"]
            userIds: listUsersId
            //customData: { foo: 42 },
        }).then(room=> {
            resolve(room);
        }).catch((err) => {
            reject(err);
        });
    });

}






