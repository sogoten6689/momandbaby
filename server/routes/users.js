var express = require('express');
var router = express.Router();
const userServices = require('../services/user_services');
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
//   instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
//   key: process.env.CHATKIT_SECRET_KEY,
    instanceLocator: 'v1:us1:d3b47aed-c439-4dc3-ae2a-06e6cf178edb',
    key: '0a4c726a-991e-4c9e-8ff0-02b715f115d7:R0cMAfGfDoNMkNi23hOUMz8dHCbyzs476CEd4ZKqxMA=',
});

/* GET users listing. */

/**
 * @api {get} /uses/ Get All Users
 * @apiVersion 1.0.0
 * @apiGroup Users
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *  "success": true,
 *  "data": [
 *{
            "id": 1,
            "fullname": "Admin",
            "address": "12 Nguyen Van Bao , phuong 4,  Go Vap, Ho Chi Minh",
            "phone": "",
            "role_id": 1,
            "email": "admin@gmail.com",
            "facebook_account": "",
            "twitter_account": "",
            "img_url": null
        },
        {
            "id": 2,
            "fullname": "Thuong Nguyen Thi Thu",
            "address": "153 An Phu Dong 09, quan 12, Ho Chi Minh",
            "phone": "0369615118",
            "role_id": 2,
            "email": "",
            "facebook_account": null,
            "twitter_account": null,
            "img_url": null
        },
        {
            "id": 3,
            "fullname": "Lam Nguyen Ngoc",
            "address": "55-57 Bau Cat 4, Tan Binh, Ho Chi Minh",
            "phone": "",
            "role_id": 2,
            "email": "",
            "facebook_account": null,
            "twitter_account": null,
            "img_url": null
        },
        {
            "id": 4,
            "fullname": "Nguyen Van A1",
            "address": "go xoai",
            "phone": "0987654321",
            "role_id": 2,
            "email": "user@gmail.com",
            "facebook_account": null,
            "twitter_account": null,
            "img_url": "user1.jpg"
        },
        {
            "id": 5,
            "fullname": "Nguyen Van A1",
            "address": "go xoai",
            "phone": "0987654321",
            "role_id": 2,
            "email": "user2@gmail.com",
            "facebook_account": null,
            "twitter_account": null,
            "img_url": null
        },
        {
            "id": 6,
            "fullname": "Nguyen Lam ne",
            "address": "",
            "phone": "1212121212",
            "role_id": 2,
            "email": "lamne@gmail.com",
            "facebook_account": null,
            "twitter_account": null,
            "img_url": null
        },
        {
            "id": 7,
            "fullname": "Nguyen Lam Ne",
            "address": "",
            "phone": "1212121212",
            "role_id": 2,
            "email": "lamnehihi@gmai.com",
            "facebook_account": null,
            "twitter_account": null,
            "img_url": null
        }
 *   ]
 *}
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *  }
 *  @apiUse FailedResponse
 */
router.get('/',auth_utils.authorizeAdmin, function (req, res) {
    userServices.getAllUsers()
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});


/**
 * @api {post} /users/signup Sign up
 * @apiVersion 1.0.0
 * @apiGroup Users
 *
 * @apiUse AccessHeader
 *
 * @apiParam (Body) {String} account User account
 * @apiParam (Body) {String} email User email
 * @apiParam (Body) {String} fullname User fullname
 * @apiParam (Body) {String} password User password
 * @apiParam (Body) {String} address User address
 * @apiParam (Body) {String} phone User phone
 * @apiParam (Body) {String} facebook_account User facebook_account
 * @apiParam (Body) {String} twitter_account User twitter_account
 * @apiParam (Body) {String} img_url User img_url
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *  }
 *  @apiUse FailedResponse
 */
router.post('/signup', [
    // if check, url, it can't be null?
    check('email').isEmail().withMessage(errors.USER_EMAIL),
    check('account').isLength({min: 5}).withMessage(errors.USER_ACCOUNT),
    check('fullname').isLength({min: 1}).withMessage(errors.USER_FULLNAME),
    check('password').isLength({min: 8}).withMessage(errors.USER_PASSWORD),
    check('phone').optional().isMobilePhone().isLength({min: 10, max: 10}).withMessage(errors.USER_PHONE),
    check('facebook_account').optional().withMessage(errors.USER_FB_ACCOUNT),
    check('twitter_account').optional().withMessage(errors.USER_TWITTER_ACCOUNT),
    check('active').optional().isBoolean().withMessage(errors.USER_ACTIVE),
    check('img_url').optional().withMessage(errors.USER_IMG_URL), ], (req, res) => {
    let account = req.body.account;
    let password = req.body.password;
    let fullname = req.body.fullname;
    let address = req.body.address;
    let email = req.body.email;
    let facebook_account = req.body.facebook_account;
    let twitter_account = req.body.twitter_account;
    let phone = req.body.phone;
    let img_url = req.body.img_url;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(utils.failedResponse({errors: errors.array()}));
    }
    userServices.signup(fullname, account, password, address, email, facebook_account, twitter_account, phone, img_url)
        .then(data => {
            res.json(utils.successResponse());
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {post} /users/login Login
 * @apiVersion 1.0.0
 * @apiGroup Users
 *
 * @apiUse AccessHeader
 *
 * @apiParam (Body) {String} account User account
 * @apiParam (Body) {String} password User password
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "id": 2,
 *      "account": "thuongntt",
 *      "fullname": "Thuong Nguyen Thi Thu",
 *      "role": {
 *          "code": "member",
 *          "name": "Member"
 *      },
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudCI6InRodW9uZ250dCIsImZ1bGxuYW1lIjoiVGh1b25nIE5ndXllbiBUaGkgVGh1Iiwicm9sZSI6eyJjb2RlIjoibWVtYmVyIiwibmFtZSI6Ik1lbWJlciJ9LCJpYXQiOjE1NTMxOTg1MTYsImV4cCI6MTU1ODM4MjUxNn0.pogCJwMYCHHJgIW77zW5y2VNuIJQoC84It-xxb_9J6s"
 *    }
 *  }
 *  @apiUse FailedResponse
 */
router.post('/login', function (req, res) {
    let account = req.body.account;
    let password = req.body.password;
    userServices.login(account, password)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {get} /users/:id Get User
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiGroup Users
 *
 * @apiUse TokenHeader
 *
 * @apiParam {Number} id User Id
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "id": 1,
 *      "account": "admin",
 *      "fullname": "Admin",
 *      "address": "12 Nguyen Van Bao , phuong 4,  Go Vap, Ho Chi Minh",
 *      "phone": "",
 *      "role_id": 1,
 *      "email": "admin@gmail.com",
 *      "facebook_account": "",
 *      "twitter_account": "",
 *      "image_url": null
 *    }
 *  }
 * @apiUse FailedResponse
 */
router.get('/:id',  function (req, res) {
    let userId = req.params.id;
    userServices.getUser(userId)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {put} /users/:id/ Update infomation of User
 * @apiVersion 1.0.0
 * @apiGroup Users
 *
 * @apiUse AccessHeader
 *
 * @apiParam (Body) {String} fullname User fullname
 * @apiParam (Body) {String} password User password
 * @apiParam (Body) {String} address User address
 * @apiParam (Body) {String} phone User phone
 * @apiParam (Body) {String} facebook_account User facebook_account
 * @apiParam (Body) {String} twitter_account User twitter_account
 * @apiParam (Body) {String} img_url User img_url
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *  }
 *  @apiUse FailedResponse
 */
router.put('/:id', [
    // if check, url, it can't be null?

    check('fullname').isLength({min: 1}).withMessage(errors.USER_FULLNAME),
    check('address').isLength({min: 1}).withMessage(errors.USER_ADDRESS),
    check('phone').optional().isMobilePhone().isLength({min: 10, max: 10}).withMessage(errors.USER_PHONE),
    check('facebook_account').optional().withMessage(errors.USER_FB_ACCOUNT),
    check('twitter_account').optional().withMessage(errors.USER_TWITTER_ACCOUNT),
    check('active').optional().isInt().withMessage(errors.USER_ACTIVE),
    check('image_url').optional().withMessage(errors.USER_IMG_URL),
], auth_utils.authorizeAdminMember, function (req, res) {
    let userId = req.params.id;
    let fullname = req.body.fullname;
    let address = req.body.address;
    let facebook_account = req.body.facebook_account;
    let twitter_account = req.body.twitter_account;
    let phone = req.body.phone;
    let email = req.body.email;
    let image_url = req.body.image_url;
    let active = req.body.active;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(utils.failedResponse({errors: errors.array()}));
    }
    userServices.updateUser(userId, fullname, address, phone,email, facebook_account, twitter_account, image_url, active)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

// router.use(cors());
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));
// chat box
router.post('/newUserChat', (req, res) => {
    const { username } = req.body;
  
    // 
  });
  
router.post('/auth', (req, res) => {
    const authData = chatkit.authenticate({
      userId: req.query.user_id,
    });
    res.status(authData.status).send(authData.body);
  });

/**
 * @api {get} /users/:id Get User by facebook id
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiGroup Users
 *
 * @apiUse TokenHeader
 *
 * @apiParam {Number} id facebook Id
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "id": 1,
 *      "account": "admin",
 *      "fullname": "Admin",
 *      "address": "12 Nguyen Van Bao , phuong 4,  Go Vap, Ho Chi Minh",
 *      "phone": "",
 *      "role_id": 1,
 *      "email": "admin@gmail.com",
 *      "facebook_account": "",
 *      "twitter_account": "",
 *      "image_url": null
 *    }
 *  }
 * @apiUse FailedResponse
 */
router.get('/facebook/:id',  function (req, res) {
    let facebook_id = req.params.id;
    userServices.getUserByIdFb(facebook_id)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {get} /users/:id Get User by email
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiGroup Users
 *
 * @apiUse TokenHeader
 *
 * @apiParam {String} email
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "id": 1,
 *      "account": "admin",
 *      "fullname": "Admin",
 *      "address": "12 Nguyen Van Bao , phuong 4,  Go Vap, Ho Chi Minh",
 *      "phone": "",
 *      "role_id": 1,
 *      "email": "admin@gmail.com",
 *      "facebook_account": "",
 *      "twitter_account": "",
 *      "image_url": null
 *    }
 *  }
 * @apiUse FailedResponse
 */
router.get('/email/:email',  function (req, res) {
    let email = req.params.email;
    userServices.getUserByEmail(email)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

router.put('/password/:id',  function (req, res) {
    let id = req.params.id;
    let passold = req.body.passold;
    let passnew = req.body.passnew;

    userServices.changepassword(id,passold,passnew)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

router.put('/updateimage/:id',  function (req, res) {
    let id = req.params.id;
    let image_urlnew = req.body.image_urlnew;

    userServices.updateImage(id,image_urlnew)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

router.put('/activeUp/:id',auth_utils.authorizeAdmin,  function (req, res) {
    let id = req.params.id;

    userServices.updateActive(id,1)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
router.put('/activeDown/:id', auth_utils.authorizeAdmin, function (req, res) {
    let id = req.params.id;
    userServices.updateActive(id,0)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

module.exports = router;
