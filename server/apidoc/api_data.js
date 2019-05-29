define({ "api": [
  {
    "type": "get",
    "url": "/topics/id/comments",
    "title": "Get Comments of Topic",
    "version": "1.0.0",
    "group": "Comments",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": [\n    {\n        \"id\": 2,\n        \"topic_id\": 2,\n        \"content\": \"Hay\",\n        \"User\": \"Admin\"\n    },\n    {\n        \"id\": 4,\n        \"topic_id\": 2,\n        \"content\": \"Tốt lắm\",\n        \"User\": \"Thuong Nguyen Thi Thu\"\n    }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/topics.js",
    "groupTitle": "Comments",
    "name": "GetTopicsIdComments",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/topics/",
    "title": "Add Topic",
    "version": "1.0.0",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Topic title</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Topic content</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "summary",
            "description": "<p>Topic summary</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "img",
            "description": "<p>Topic img</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "type_id",
            "description": "<p>Topic type_id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/topics.js",
    "groupTitle": "Comments",
    "name": "PostTopics",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/topics/:id/comments",
    "title": "Comment Topic",
    "version": "1.0.0",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "topic_id",
            "description": "<p>Topic id</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/topics.js",
    "groupTitle": "Comments",
    "name": "PostTopicsIdComments",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/topics/id",
    "title": "Get Topic By ID",
    "version": "1.0.0",
    "group": "Topics",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": {\n    \"id\": 4,\n    \"title\": \"12345\",\n    \"created_at\": \"2019-03-22T21:06:02.000Z\",\n    \"content\": \"asdfghjkl\",\n    \"views\": 1,\n    \"likes\": null,\n    \"shares\": null,\n    \"User\": \"Thuong Nguyen Thi Thu\",\n    \"Type\": \"Kinh nghiệm hay\"\n}\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/topics.js",
    "groupTitle": "Topics",
    "name": "GetTopicsId",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/topics/latest",
    "title": "Get 10 Latest Topics",
    "version": "1.0.0",
    "group": "Topics",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": [\n    {\n        \"id\": 4,\n        \"title\": \"12345\",\n        \"content\": \"asdfghjkl\",\n        \"views\": null,\n        \"likes\": null,\n        \"shares\": null,\n       \"author\": \"Thuong Nguyen Thi Thu\",\n        \"type\": \"Kinh nghiệm hay\",\n        \"created_at\": \"2019-03-22T21:06:02.000Z\"\n   },\n    {\n        \"id\": 1,\n        \"title\": \"1 ngày làm mẹ\",\n        \"content\": \"<div class=\\\"postbody\\\"> <div class=\\\"postrow\\\">  <div class=\\\"content\\\"> <div id=\\\"post_message_36354571\\\"> <blockquote class=\\\"postcontent restore\\\"> <b>Tuổi thơ ai sinh ra và lớn lên cũng từng ít nhất 1 lần ăn trái ô mai trong đời, ăn thì ăn vậy thôi chứ ít ai b\",\n        \"views\": null,\n        \"likes\": null,\n        \"shares\": null,\n        \"author\": \"Admin\",\n        \"type\": \"Làm mẹ\",\n        \"created_at\": \"2019-03-21T21:06:02.000Z\"\n    }\n]\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/topics.js",
    "groupTitle": "Topics",
    "name": "GetTopicsLatest",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/topics/search/search_key",
    "title": "Search Topic By Title",
    "version": "1.0.0",
    "group": "Topics",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": [\n    {\n        \"id\": 1,\n        \"title\": \"1 ngày làm mẹ\",\n        \"content\": \"<div class=\\\"postbody\\\"> <div class=\\\"postrow\\\">  <div class=\\\"content\\\"> <div id=\\\"post_message_36354571\\\"> <blockquote class=\\\"postcontent restore\\\"> <b>Tuổi thơ ai sinh ra và lớn lên cũng từng ít nhất 1 lần ăn trái ô mai trong đời, ăn thì ăn vậy thôi chứ ít ai b\",\n        \"views\": 9,\n        \"likes\": null,\n        \"shares\": null,\n        \"author\": \"Admin\",\n        \"type\": \"Làm mẹ\",\n        \"created_at\": \"2019-03-21T21:06:02.000Z\"\n    },\n    {\n        \"id\": 2,\n        \"title\": \"Sức khỏe cho mẹ trong 3 tháng đầu\",\n        \"content\": \"<div class=\\\"postbody\\\"> <div class=\\\"postrow\\\">  <div class=\\\"content\\\"> <div id=\\\"post_message_36354571\\\"> <blockquote class=\\\"postcontent restore\\\"> <b>Tuổi thơ ai sinh ra và lớn lên cũng từng ít nhất 1 lần ăn trái ô mai trong đời, ăn thì ăn vậy thôi chứ ít ai b\",\n        \"views\": 7,\n        \"likes\": null,\n        \"shares\": null,\n        \"author\": \"Admin\",\n        \"type\": \"Sức khỏe\",\n        \"created_at\": \"2019-03-21T21:06:02.000Z\"\n    }\n]\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/topics.js",
    "groupTitle": "Topics",
    "name": "GetTopicsSearchSearch_key",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/types/",
    "title": "Get All Types",
    "version": "1.0.0",
    "group": "Types",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": " HTTP/1.1 200 OK\n {\n \"success\": true,\n \"data\": [\n     {\n        \"id\": 1,\n         \"name\": \"Làm mẹ\",\n         \"children\": [\n             {\n                 \"id\": 9,\n                 \"name\": \"Trong khi mang thai\"\n            },\n              {\n                 \"id\": 10,\n                 \"name\": \"Chăm sóc bé 0-12 tháng\"\n             },\n             {\n                 \"id\": 11,\n                 \"name\": \"Nuôi dạy bé 1-3 tuổi\"\n             },\n            {\n                  \"id\": 12,\n                 \"name\": \"Nuôi dạy bé 5-13 tuổi\"\n             }\n         ]\n     },\n     {\n         \"id\": 2,\n         \"name\": \"Kinh nghiệm hay\",\n         \"children\": [\n             {\n                 \"id\": 13,\n                  \"name\": \"Mua sữa cho mẹ bầu\"\n                },\n           },\n             {\n                 \"id\": 14,\n                 \"name\": \"Mua sữa cho bé\"\n             },\n             {\n                 \"id\": 15,\n                 \"name\": \"Món ngon cho bé\"\n             }\n         ]\n     },\n     {\n         \"id\": 3,\n         \"name\": \"Sức khỏe\",\n         \"children\": [\n             {\n                 \"id\": 6,\n                 \"name\": \"Chữa bệnh cho bé\"\n             },\n             {\n                 \"id\": 7,\n                 \"name\": \"Chữa bệnh cho mẹ\"\n             }\n         ]\n     },\n     {\n         \"id\": 4,\n         \"name\": \"Giải trí\",\n         \"children\": [\n             {\n                 \"id\": 5,\n                 \"name\": \"Sách, truyện cho bé\"\n             }\n         ]\n     }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/types.js",
    "groupTitle": "Types",
    "name": "GetTypes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/typesforMenu/",
    "title": "Get Type for Menu",
    "version": "1.0.0",
    "group": "Types",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": " HTTP/1.1 200 OK\n {\n \"success\": true,\n \"data\": [\n     {\n        \"id\": 1,\n         \"name\": \"Làm mẹ\",\n         \"children\": [\n             {\n                 \"id\": 9,\n                 \"name\": \"Trong khi mang thai\"\n            },\n              {\n                 \"id\": 10,\n                 \"name\": \"Chăm sóc bé 0-12 tháng\"\n             },\n             {\n                 \"id\": 11,\n                 \"name\": \"Nuôi dạy bé 1-3 tuổi\"\n             },\n            {\n                  \"id\": 12,\n                 \"name\": \"Nuôi dạy bé 5-13 tuổi\"\n             }\n         ]\n     },\n     {\n         \"id\": 2,\n         \"name\": \"Kinh nghiệm hay\",\n         \"children\": [\n             {\n                 \"id\": 13,\n                  \"name\": \"Mua sữa cho mẹ bầu\"\n                },\n           },\n             {\n                 \"id\": 14,\n                 \"name\": \"Mua sữa cho bé\"\n             },\n             {\n                 \"id\": 15,\n                 \"name\": \"Món ngon cho bé\"\n             }\n         ]\n     },\n     {\n         \"id\": 3,\n         \"name\": \"Sức khỏe\",\n         \"children\": [\n             {\n                 \"id\": 6,\n                 \"name\": \"Chữa bệnh cho bé\"\n             },\n             {\n                 \"id\": 7,\n                 \"name\": \"Chữa bệnh cho mẹ\"\n             }\n         ]\n     },\n     {\n         \"id\": 4,\n         \"name\": \"Giải trí\",\n         \"children\": [\n             {\n                 \"id\": 5,\n                 \"name\": \"Sách, truyện cho bé\"\n             }\n         ]\n     }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Types",
    "name": "GetTypesformenu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/typesforMenu/",
    "title": "Get Type for Menu",
    "version": "1.0.0",
    "group": "Types",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": " HTTP/1.1 200 OK\n {\n \"success\": true,\n \"data\": [\n     {\n        \"id\": 1,\n         \"name\": \"Làm mẹ\",\n         \"children\": [\n             {\n                 \"id\": 9,\n                 \"name\": \"Trong khi mang thai\"\n            },\n              {\n                 \"id\": 10,\n                 \"name\": \"Chăm sóc bé 0-12 tháng\"\n             },\n             {\n                 \"id\": 11,\n                 \"name\": \"Nuôi dạy bé 1-3 tuổi\"\n             },\n            {\n                  \"id\": 12,\n                 \"name\": \"Nuôi dạy bé 5-13 tuổi\"\n             }\n         ]\n     },\n     {\n         \"id\": 2,\n         \"name\": \"Kinh nghiệm hay\",\n         \"children\": [\n             {\n                 \"id\": 13,\n                  \"name\": \"Mua sữa cho mẹ bầu\"\n                },\n           },\n             {\n                 \"id\": 14,\n                 \"name\": \"Mua sữa cho bé\"\n             },\n             {\n                 \"id\": 15,\n                 \"name\": \"Món ngon cho bé\"\n             }\n         ]\n     },\n     {\n         \"id\": 3,\n         \"name\": \"Sức khỏe\",\n         \"children\": [\n             {\n                 \"id\": 6,\n                 \"name\": \"Chữa bệnh cho bé\"\n             },\n             {\n                 \"id\": 7,\n                 \"name\": \"Chữa bệnh cho mẹ\"\n             }\n         ]\n     },\n     {\n         \"id\": 4,\n         \"name\": \"Giải trí\",\n         \"children\": [\n             {\n                 \"id\": 5,\n                 \"name\": \"Sách, truyện cho bé\"\n             }\n         ]\n     }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/types.js",
    "groupTitle": "Types",
    "name": "GetTypesformenu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "Admin",
        "title": "Admin accounts access only",
        "description": "<p>Active users that belong to Admin Role</p>"
      }
    ],
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": {\n    \"id\": 1,\n    \"account\": \"admin\",\n    \"fullname\": \"Admin\",\n    \"address\": \"12 Nguyen Van Bao , phuong 4,  Go Vap, Ho Chi Minh\",\n    \"phone\": \"\",\n    \"role_id\": 1,\n    \"email\": \"admin@gmail.com\",\n    \"facebook_account\": \"\",\n    \"twitter_account\": \"\",\n    \"image_url\": null\n  }\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "GetUsersId",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User token string to authorize</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/uses/",
    "title": "Get All Users",
    "version": "1.0.0",
    "group": "Users",
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": " HTTP/1.1 200 OK\n {\n \"success\": true,\n \"data\": [\n{\n            \"id\": 1,\n            \"fullname\": \"Admin\",\n            \"address\": \"12 Nguyen Van Bao , phuong 4,  Go Vap, Ho Chi Minh\",\n            \"phone\": \"\",\n            \"role_id\": 1,\n            \"email\": \"admin@gmail.com\",\n            \"facebook_account\": \"\",\n            \"twitter_account\": \"\",\n            \"img_url\": null\n        },\n        {\n            \"id\": 2,\n            \"fullname\": \"Thuong Nguyen Thi Thu\",\n            \"address\": \"153 An Phu Dong 09, quan 12, Ho Chi Minh\",\n            \"phone\": \"0369615118\",\n            \"role_id\": 2,\n            \"email\": \"\",\n            \"facebook_account\": null,\n            \"twitter_account\": null,\n            \"img_url\": null\n        },\n        {\n            \"id\": 3,\n            \"fullname\": \"Lam Nguyen Ngoc\",\n            \"address\": \"55-57 Bau Cat 4, Tan Binh, Ho Chi Minh\",\n            \"phone\": \"\",\n            \"role_id\": 2,\n            \"email\": \"\",\n            \"facebook_account\": null,\n            \"twitter_account\": null,\n            \"img_url\": null\n        },\n        {\n            \"id\": 4,\n            \"fullname\": \"Nguyen Van A1\",\n            \"address\": \"go xoai\",\n            \"phone\": \"0987654321\",\n            \"role_id\": 2,\n            \"email\": \"user@gmail.com\",\n            \"facebook_account\": null,\n            \"twitter_account\": null,\n            \"img_url\": \"user1.jpg\"\n        },\n        {\n            \"id\": 5,\n            \"fullname\": \"Nguyen Van A1\",\n            \"address\": \"go xoai\",\n            \"phone\": \"0987654321\",\n            \"role_id\": 2,\n            \"email\": \"user2@gmail.com\",\n            \"facebook_account\": null,\n            \"twitter_account\": null,\n            \"img_url\": null\n        },\n        {\n            \"id\": 6,\n            \"fullname\": \"Nguyen Lam ne\",\n            \"address\": \"\",\n            \"phone\": \"1212121212\",\n            \"role_id\": 2,\n            \"email\": \"lamne@gmail.com\",\n            \"facebook_account\": null,\n            \"twitter_account\": null,\n            \"img_url\": null\n        },\n        {\n            \"id\": 7,\n            \"fullname\": \"Nguyen Lam Ne\",\n            \"address\": \"\",\n            \"phone\": \"1212121212\",\n            \"role_id\": 2,\n            \"email\": \"lamnehihi@gmai.com\",\n            \"facebook_account\": null,\n            \"twitter_account\": null,\n            \"img_url\": null\n        }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "GetUses",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login",
    "version": "1.0.0",
    "group": "Users",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>User account</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": {\n    \"id\": 2,\n    \"account\": \"thuongntt\",\n    \"fullname\": \"Thuong Nguyen Thi Thu\",\n    \"role\": {\n        \"code\": \"member\",\n        \"name\": \"Member\"\n    },\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudCI6InRodW9uZ250dCIsImZ1bGxuYW1lIjoiVGh1b25nIE5ndXllbiBUaGkgVGh1Iiwicm9sZSI6eyJjb2RlIjoibWVtYmVyIiwibmFtZSI6Ik1lbWJlciJ9LCJpYXQiOjE1NTMxOTg1MTYsImV4cCI6MTU1ODM4MjUxNn0.pogCJwMYCHHJgIW77zW5y2VNuIJQoC84It-xxb_9J6s\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PostUsersLogin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "Sign up",
    "version": "1.0.0",
    "group": "Users",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>User account</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "fullname",
            "description": "<p>User fullname</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User address</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>User phone</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "facebook_account",
            "description": "<p>User facebook_account</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "twitter_account",
            "description": "<p>User twitter_account</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "img_url",
            "description": "<p>User img_url</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PostUsersSignup",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/users/:id/",
    "title": "Update infomation of User",
    "version": "1.0.0",
    "group": "Users",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "fullname",
            "description": "<p>User fullname</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User address</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>User phone</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "facebook_account",
            "description": "<p>User facebook_account</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "twitter_account",
            "description": "<p>User twitter_account</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "img_url",
            "description": "<p>User img_url</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PutUsersId",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          }
        ]
      }
    }
  }
] });
