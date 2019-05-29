var express = require('express');
var router = express.Router();
const typeServicesAdmin = require('../services/admin/type_services');
const typeServices = require('../services/type_services');
const utils = require('../helper/api_helper');
const auth_utils = require('../config/auth_utils');
const errors = require('../lib/errors');
const topicServices = require('../services/topic_services');

/**
 * @api {get} /types/ Get All Types
 * @apiVersion 1.0.0
 * @apiGroup Types
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *  "success": true,
 *  "data": [
 *      {
 *         "id": 1,
 *          "name": "Làm mẹ",
 *          "children": [
 *              {
 *                  "id": 9,
 *                  "name": "Trong khi mang thai"
 *             },
 *               {
 *                  "id": 10,
 *                  "name": "Chăm sóc bé 0-12 tháng"
 *              },
 *              {
 *                  "id": 11,
 *                  "name": "Nuôi dạy bé 1-3 tuổi"
 *              },
 *             {
 *                   "id": 12,
 *                  "name": "Nuôi dạy bé 5-13 tuổi"
 *              }
 *          ]
 *      },
 *      {
 *          "id": 2,
 *          "name": "Kinh nghiệm hay",
 *          "children": [
 *              {
 *                  "id": 13,
 *                   "name": "Mua sữa cho mẹ bầu"
 *                 },
 *            },
 *              {
 *                  "id": 14,
 *                  "name": "Mua sữa cho bé"
 *              },
 *              {
 *                  "id": 15,
 *                  "name": "Món ngon cho bé"
 *              }
 *          ]
 *      },
 *      {
 *          "id": 3,
 *          "name": "Sức khỏe",
 *          "children": [
 *              {
 *                  "id": 6,
 *                  "name": "Chữa bệnh cho bé"
 *              },
 *              {
 *                  "id": 7,
 *                  "name": "Chữa bệnh cho mẹ"
 *              }
 *          ]
 *      },
 *      {
 *          "id": 4,
 *          "name": "Giải trí",
 *          "children": [
 *              {
 *                  "id": 5,
 *                  "name": "Sách, truyện cho bé"
 *              }
 *          ]
 *      }
 *   ]
 *}
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *  }
 *  @apiUse FailedResponse
 */
router.get('/', (req, res) => {
    typeServicesAdmin.getALLTypes()
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

/**
 * @api {get} /typesforMenu/ Get Type for Menu
 * @apiVersion 1.0.0
 * @apiGroup Types
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *  "success": true,
 *  "data": [
 *      {
 *         "id": 1,
 *          "name": "Làm mẹ",
 *          "children": [
 *              {
 *                  "id": 9,
 *                  "name": "Trong khi mang thai"
 *             },
 *               {
 *                  "id": 10,
 *                  "name": "Chăm sóc bé 0-12 tháng"
 *              },
 *              {
 *                  "id": 11,
 *                  "name": "Nuôi dạy bé 1-3 tuổi"
 *              },
 *             {
 *                   "id": 12,
 *                  "name": "Nuôi dạy bé 5-13 tuổi"
 *              }
 *          ]
 *      },
 *      {
 *          "id": 2,
 *          "name": "Kinh nghiệm hay",
 *          "children": [
 *              {
 *                  "id": 13,
 *                   "name": "Mua sữa cho mẹ bầu"
 *                 },
 *            },
 *              {
 *                  "id": 14,
 *                  "name": "Mua sữa cho bé"
 *              },
 *              {
 *                  "id": 15,
 *                  "name": "Món ngon cho bé"
 *              }
 *          ]
 *      },
 *      {
 *          "id": 3,
 *          "name": "Sức khỏe",
 *          "children": [
 *              {
 *                  "id": 6,
 *                  "name": "Chữa bệnh cho bé"
 *              },
 *              {
 *                  "id": 7,
 *                  "name": "Chữa bệnh cho mẹ"
 *              }
 *          ]
 *      },
 *      {
 *          "id": 4,
 *          "name": "Giải trí",
 *          "children": [
 *              {
 *                  "id": 5,
 *                  "name": "Sách, truyện cho bé"
 *              }
 *          ]
 *      }
 *   ]
 *}
 * @apiUse FailedResponse
 */
router.get('/typesforMenu', auth_utils.authorizeHeader, function (req, res) {
    typeServices.getTypesForMenuBar()
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});


/**
 * @api {get} /types/:id Get Topics by Type
 * @apiVersion 1.0.0
 * @apiGroup Types
 *
 * @apiUse AccessHeader
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *  "success": true,
 * * "data": [
 *      {
 *           "id": 8,
 *           "title": "12sfdhfgj",
 *           "content": "<p><img src=\"https://s3-us-west-2.amazonaws.com/babyandmom/g2.jpg\"></p>",
 *           "summary": "fgfbg",
 *          "img": "https://s3-us-west-2.amazonaws.com/babyandmom/aa11.jpg",
 *           "views": 0,
 *           "likes": 0,
 *           "shares": 0,
 *            "author": "Thuong Nguyen Thi Thu",
 *          "type": "Mua sữa cho mẹ bầu",
 *          "created_at": "2019-05-26T09:39:56.000Z"
 *      },
 *      {
 *          "id": 7,
 *          "title": "fdsgfhfh",
 *          "content": "<p><img src=\"https://s3-us-west-2.amazonaws.com/babyandmom/g2.jpg\"></p>",
 *          "summary": "fgfbg",
 *          "img": "https://s3-us-west-2.amazonaws.com/babyandmom/aa11.jpg",
 *          "views": 0,
 *          "likes": 0,
 *          "shares": 0,
 *          "author": "Thuong Nguyen Thi Thu",
 *          "type": "Mua sữa cho mẹ bầu",
 *           "created_at": "2019-05-26T09:39:56.000Z"
 *      }
 *
 *   ]
 *}
 * @apiUse FailedResponse
 */
router.get('/:id', (req, res) => {
    let requestId = req.params.id;
    topicServices.getTopicByTypeID(requestId)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

module.exports = router;
