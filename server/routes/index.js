var express = require('express');
var router = express.Router();
const typeServices = require('../services/type_services');
const constants = require('../config/constants');
const utils = require('../helper/api_helper');
const auth_utils = require('../config/auth_utils');

/* GET index page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
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
//test
router.get('/helloserver',  function (req, res) {
    res.json(utils.successResponse("{'hellllo':'helllo')"))
});

module.exports = router;
