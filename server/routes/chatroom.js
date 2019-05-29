var express = require('express');
var router = express.Router();

const chatServices = require('../services/chat_services');
const constants = require('../config/constants');
const utils = require('../helper/api_helper');
const auth_utils = require('../config/auth_utils');
const errors = require('../lib/errors');
const {check, validationResult} = require('express-validator/check');

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


// chat box
router.post('/newUserChat', (req, res) => {
    //const { username } = req.body;
    let username = req.body.username;
    let id = req.body.username;
    chatServices.createUser(id, username)
    .then(data => {
        res.json(utils.successResponse(data));
    })
    .catch(error => {
        res.json(utils.failedResponse(error));
    });
    
});
  
router.post('/auth', (req, res) => {
    let userId = req.query.user_id;
    chatServices.auth(userId)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        res.json(utils.failedResponse(error));
    });

});

router.get('/getListRoom', (req, res) =>{
    chatServices.getListRoom()
    .then(data => {
        res.json(utils.successResponse(data));
    })
    .catch(error => {
        res.json(utils.failedResponse(error));
    });
})

router.get('/getListUsers', (req, res) =>{
    chatServices.getListUsers()
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
})

router.get('/getListRoomOfUser/:id', (req, res) =>{
    let userId = req.params.id;
    chatServices.getListRoomOfUser(userId)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
})


router.post('/createRoom/',(req, res) =>{
    let userId = req.body.userId;
    let name = req.body.name;
    let listUserId = req.body.lstUserId;
    console.log(req.body);
    chatServices.createRoom(userId, name, listUserId)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
})
module.exports = router;
      