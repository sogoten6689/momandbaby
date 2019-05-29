var express = require('express');
var router = express.Router();
const topicServices = require('../services/topic_services');
const commentServices = require('../services/comments_services');
const errors = require('../lib/errors');
const utils = require('../helper/api_helper');
const auth_utils = require('../config/auth_utils');
const {check, validationResult} = require('express-validator/check');


/**
 * @api {post} /topics/ Add Topic
 * @apiVersion 1.0.0
 * @apiGroup Comments
 *
 * @apiUse AccessHeader
 *
 * @apiParam (Body) {String} user_id User id
 * @apiParam (Body) {String} title Topic title
 * @apiParam (Body) {String} content Topic content
 * @apiParam (Body) {String} summary Topic summary
 * @apiParam (Body) {String} img Topic img
 * @apiParam (Body) {String} type_id Topic type_id
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *  }
 *  @apiUse FailedResponse
 */
router.post('/', auth_utils.authorizeAdminMember, [
    check('author').isLength({min: 1}).withMessage(errors.USER_ACCOUNT),
    check('title').isLength({min: 1}).withMessage(errors.TOPIC_01),
    check('content').isLength({min: 1}).withMessage(errors.CONTENT),
    check('summary').isLength({min: 1}).withMessage(errors.SUMMARY),
    check('type').isLength({min: 1}).withMessage(errors.TYPE_ID),
], (req, res) => {
    let user_id = req.body.author;
    let title = req.body.title;
    let content = req.body.content;
    let summary = req.body.summary;
    let img = req.body.img;
    let type_id = req.body.type;
    const errors = validationResult(req);
    console.log("content "+content);
    if (!errors.isEmpty()) {
        return res.json(utils.failedResponse({errors: errors.array()}));
    }
    topicServices.addTopic(user_id,title,content,summary,img,type_id)
        .then(data => {
            res.json(utils.successResponse());
        })
        .catch(error => {
            console.log("user_id");
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {get} /topics/latest  Get 10 Latest Topics
 * @apiVersion 1.0.0
 * @apiGroup Topics
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": [
 *      {
 *          "id": 4,
 *          "title": "12345",
 *          "content": "asdfghjkl",
 *          "views": null,
 *          "likes": null,
 *          "shares": null,
 *         "author": "Thuong Nguyen Thi Thu",
 *          "type": "Kinh nghiệm hay",
 *          "created_at": "2019-03-22T21:06:02.000Z"
 *     },
 *      {
 *          "id": 1,
 *          "title": "1 ngày làm mẹ",
 *          "content": "<div class=\"postbody\"> <div class=\"postrow\">  <div class=\"content\"> <div id=\"post_message_36354571\"> <blockquote class=\"postcontent restore\"> <b>Tuổi thơ ai sinh ra và lớn lên cũng từng ít nhất 1 lần ăn trái ô mai trong đời, ăn thì ăn vậy thôi chứ ít ai b",
 *          "views": null,
 *          "likes": null,
 *          "shares": null,
 *          "author": "Admin",
 *          "type": "Làm mẹ",
 *          "created_at": "2019-03-21T21:06:02.000Z"
 *      }
 *  ]
 *  }
 *  @apiUse FailedResponse
 */
router.get('/latest', function (req, res) {
    topicServices.getLatestTopics()
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {get} /topics/topviews  Get top 5 views
 * @apiVersion 1.0.0
 * @apiGroup Topics
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": [
 *      {
 *          "id": 4,
 *          "title": "12345",
 *          "content": "asdfghjkl",
 *          "views": 12,
 *          "likes": 1,
 *          "shares": 1,
 *         "author": "Thuong Nguyen Thi Thu",
 *          "type": "Kinh nghiệm hay",
 *          "created_at": "2019-03-22T21:06:02.000Z"
 *     },
 *      {
 *          "id": 1,
 *          "title": "1 ngày làm mẹ",
 *          "content": "<div class=\"postbody\"> <div class=\"postrow\">  <div class=\"content\"> <div id=\"post_message_36354571\"> <blockquote class=\"postcontent restore\"> <b>Tuổi thơ ai sinh ra và lớn lên cũng từng ít nhất 1 lần ăn trái ô mai trong đời, ăn thì ăn vậy thôi chứ ít ai b",
 *          "views": 3,
 *          "likes": 1,
 *          "shares": 1,
 *          "author": "Admin",
 *          "type": "Làm mẹ",
 *          "created_at": "2019-03-21T21:06:02.000Z"
 *      }
 *  ]
 *  }
 *  @apiUse FailedResponse
 */
router.get('/topviews', function (req, res) {
    topicServices.getTop5Views()
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {get} /topics/toplikes  Get top 5 Likes
 * @apiVersion 1.0.0
 * @apiGroup Topics
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": [
 *      {
 *          "id": 4,
 *          "title": "12345",
 *          "content": "asdfghjkl",
 *          "views": 12,
 *          "likes": 50,
 *          "shares": 1,
 *         "author": "Thuong Nguyen Thi Thu",
 *          "type": "Kinh nghiệm hay",
 *          "created_at": "2019-03-22T21:06:02.000Z"
 *     },
 *      {
 *          "id": 1,
 *          "title": "1 ngày làm mẹ",
 *          "content": "<div class=\"postbody\"> <div class=\"postrow\">  <div class=\"content\"> <div id=\"post_message_36354571\"> <blockquote class=\"postcontent restore\"> <b>Tuổi thơ ai sinh ra và lớn lên cũng từng ít nhất 1 lần ăn trái ô mai trong đời, ăn thì ăn vậy thôi chứ ít ai b",
 *          "views": 14,
 *          "likes": 13,
 *          "shares": 1,
 *          "author": "Admin",
 *          "type": "Làm mẹ",
 *          "created_at": "2019-03-21T21:06:02.000Z"
 *      }
 *  ]
 *  }
 *  @apiUse FailedResponse
 */
router.get('/toplikes', function (req, res) {
    topicServices.getTop5Likes()
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {get} /topics/notapproved  Get list topic haven't approved
 * @apiVersion 1.0.0
 * @apiGroup Topics
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": [
 *      {
 *          "id": 4,
 *          "title": "12345",
 *          "content": "asdfghjkl",
 *          "views": 12,
 *          "likes": 50,
 *          "shares": 1,
 *         "author": "Thuong Nguyen Thi Thu",
 *          "type": "Kinh nghiệm hay",
 *          "created_at": "2019-03-22T21:06:02.000Z"
 *     },
 *      {
 *          "id": 1,
 *          "title": "1 ngày làm mẹ",
 *          "content": "<div class=\"postbody\"> <div class=\"postrow\">  <div class=\"content\"> <div id=\"post_message_36354571\"> <blockquote class=\"postcontent restore\"> <b>Tuổi thơ ai sinh ra và lớn lên cũng từng ít nhất 1 lần ăn trái ô mai trong đời, ăn thì ăn vậy thôi chứ ít ai b",
 *          "views": 14,
 *          "likes": 13,
 *          "shares": 1,
 *          "author": "Admin",
 *          "type": "Làm mẹ",
 *          "created_at": "2019-03-21T21:06:02.000Z"
 *      }
 *  ]
 *  }
 *  @apiUse FailedResponse
 */
router.get('/notapproved',auth_utils.authorizeAdmin, function (req, res) {
    topicServices.getTopicsNotApproved()
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {post} /topics/approved Approved list Topics
 * @apiVersion 1.0.0
 * @apiGroup Topics
 *
 * @apiUse AccessHeader
 *
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *  }
 *  @apiUse FailedResponse
 */
router.post('/approved', auth_utils.authorizeAdmin, function (req, res) {
    let body = req.body;
    let listID = req.body.listID;
    console.log(body);
    console.log(listID);
    topicServices.approvedTopics(listID)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {get} /topics/id  Get Topic By ID
 * @apiVersion 1.0.0
 * @apiGroup Topics
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "id": 4,
 *      "title": "12345",
 *      "created_at": "2019-03-22T21:06:02.000Z",
 *      "content": "asdfghjkl",
 *      "views": 1,
 *      "likes": null,
 *      "shares": null,
 *      "User": "Thuong Nguyen Thi Thu",
 *      "Type": "Kinh nghiệm hay"
 *  }
 *  }
 *  @apiUse FailedResponse
 */

router.get('/:id', function (req, res) {
    let requestId = req.params.id;
    topicServices.getTopicByID(requestId)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {get} /topics/search/search_key  Search Topic By Title
 * @apiVersion 1.0.0
 * @apiGroup Topics
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": [
 *      {
 *          "id": 1,
 *          "title": "1 ngày làm mẹ",
 *          "content": "<div class=\"postbody\"> <div class=\"postrow\">  <div class=\"content\"> <div id=\"post_message_36354571\"> <blockquote class=\"postcontent restore\"> <b>Tuổi thơ ai sinh ra và lớn lên cũng từng ít nhất 1 lần ăn trái ô mai trong đời, ăn thì ăn vậy thôi chứ ít ai b",
 *          "views": 9,
 *          "likes": null,
 *          "shares": null,
 *          "author": "Admin",
 *          "type": "Làm mẹ",
 *          "created_at": "2019-03-21T21:06:02.000Z"
 *      },
 *      {
 *          "id": 2,
 *          "title": "Sức khỏe cho mẹ trong 3 tháng đầu",
 *          "content": "<div class=\"postbody\"> <div class=\"postrow\">  <div class=\"content\"> <div id=\"post_message_36354571\"> <blockquote class=\"postcontent restore\"> <b>Tuổi thơ ai sinh ra và lớn lên cũng từng ít nhất 1 lần ăn trái ô mai trong đời, ăn thì ăn vậy thôi chứ ít ai b",
 *          "views": 7,
 *          "likes": null,
 *          "shares": null,
 *          "author": "Admin",
 *          "type": "Sức khỏe",
 *          "created_at": "2019-03-21T21:06:02.000Z"
 *      }
 *  ]
 *  }
 *  @apiUse FailedResponse
 */
router.get('/search/:search_key', function (req, res) {
    let requestId = req.params.search_key;
    topicServices.searchTopic(requestId)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {get} /topics/id/comments  Get Comments of Topic
 * @apiVersion 1.0.0
 * @apiGroup Comments
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": [
 *      {
 *          "id": 2,
 *          "topic_id": 2,
 *          "content": "Hay",
 *          "User": "Admin"
 *      },
 *      {
 *          "id": 4,
 *          "topic_id": 2,
 *          "content": "Tốt lắm",
 *          "User": "Thuong Nguyen Thi Thu"
 *      }
 *      ]
 *  }
 *  @apiUse FailedResponse
 */
router.get('/:id/comments', function (req, res) {
    let requestId = req.params.id;
    commentServices.getTopicCommentByTopicID(requestId)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {post} /topics/:id/comments Comment Topic
 * @apiVersion 1.0.0
 * @apiGroup Comments
 *
 * @apiUse AccessHeader
 *
 * @apiParam (Body) {String} user_id User id
 * @apiParam (Body) {String} topic_id Topic id
 * @apiParam (Body) {String} content Content
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *  }
 *  @apiUse FailedResponse
 */
router.post('/:id/comments', auth_utils.authorizeAdminMember, [
    check('user_id').isLength({min: 1}).withMessage(errors.USER_ACCOUNT),
    check('topic_id').isLength({min: 1}).withMessage(errors.TOPIC_01),
    check('content').isLength({min: 1}).withMessage(errors.INFORMATION_01),
], (req, res) => {
    let user_id = req.body.user_id;
    let topic_id = req.body.topic_id;
    let content = req.body.content;
    const errors = validationResult(req);
    console.log("content "+content);
    if (!errors.isEmpty()) {
        return res.json(utils.failedResponse({errors: errors.array()}));
    }
    commentServices.addComment(user_id, topic_id, content)
        .then(data => {
            res.json(utils.successResponse());
        })
        .catch(error => {
            console.log("user_id");
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {put} /topics/:id/like Like Topic
 * @apiVersion 1.0.0
 * @apiGroup Topics
 *
 * @apiUse AccessHeader
 *
 * @apiParam (Body) {String} user_id User id
 * @apiParam (Param) {String} topic_id Topic id
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *  }
 *  @apiUse FailedResponse
 */
router.put('/:id/like', auth_utils.authorizeAdminMember, [
    check('user_id').isLength({min: 1}).withMessage(errors.USER_ACCOUNT),
    check('topic_id').isLength({min: 1}).withMessage(errors.TOPIC_01),
], (req, res) => {
    let user_id = req.body.user_id;
    let topic_id = req.body.topic_id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(utils.failedResponse({errors: errors.array()}));
    }
    topicServices.likeTopic(user_id, topic_id)
        .then(data => {
            res.json(utils.successResponse());
        })
        .catch(error => {
            console.log("user_id");
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {put} /topics/:id/dislike Dislike Topic
 * @apiVersion 1.0.0
 * @apiGroup Topics
 *
 * @apiUse AccessHeader
 *
 * @apiParam (Body) {String} user_id User id
 * @apiParam (Param) {String} topic_id Topic id
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *  }
 *  @apiUse FailedResponse
 */
router.put('/:id/dislike', auth_utils.authorizeAdminMember, [
    check('user_id').isLength({min: 1}).withMessage(errors.USER_ACCOUNT),
    check('topic_id').isLength({min: 1}).withMessage(errors.TOPIC_01),
], (req, res) => {
    let user_id = req.body.user_id;
    let topic_id = req.body.topic_id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(utils.failedResponse({errors: errors.array()}));
    }
    topicServices.dislikeTopic(user_id, topic_id)
        .then(data => {
            res.json(utils.successResponse());
        })
        .catch(error => {
            console.log("user_id");
            res.json(utils.failedResponse(error));
        });
});


module.exports = router;
