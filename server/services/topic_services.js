'use strict';
const log4js = require('log4js');
const logger = log4js.getLogger();
const Promise = require('bluebird');
const auth_utils = require('../config/auth_utils');
const models = require('../db/models/index');
const helpers = require('../helper/api_helper');
const errors = require('../lib/errors');
const Op = (require('sequelize')).Op;
const dateTime = require('node-datetime');

exports.getLatestTopics = async function () {
    return new Promise(function (resolve, reject) {
        models.Topic.findAll({
            attributes: ['id', 'title', 'created_at', 'content', 'views', 'likes', 'shares', 'summary', 'img'],
            include: [
                {
                    model: models.User,
                    required: false,
                    attributes: ['id', 'fullname']
                },
                {
                    model: models.Type,
                    required: false,
                    attributes: ['id', 'name']
                }
            ],
            where: {
                status: 1
            },
            limit: 10,
            order: [['created_at', 'DESC']],
        })
            .then(topics => {

                console.log(topics);
                let result = topics.map(topic => {
                    return {
                        id: topic.id,
                        title: topic.title,
                        content: topic.content,
                        summary: topic.summary,
                        img: topic.img,
                        views: topic.views,
                        likes: topic.likes,
                        shares: topic.shares,
                        author: topic.User.fullname,
                        type: topic.Type.name,
                        created_at: topic.created_at,

                    }
                });
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

exports.getTopicByID = function (id) {
    return new Promise(function (resolve, reject) {
        models.Topic.findOne({
            attributes: ['id', 'title', 'created_at', 'content', 'views', 'likes', 'dislikes','shares', 'summary', 'img'],
            include: [
                {
                    model: models.User,
                    required: true,
                    attributes: ['id', 'fullname'],
                    as: 'User'
                },
                {
                    model: models.Type,
                    required: false,
                    attributes: ['id', 'name']
                }
            ],
            where: {
                id: id
            }
        })
            .then(topic => {
                if (topic == null) {
                    throw {
                        message: errors.TOPIC_01,
                        code: 'TOPIC_01'
                    };
                }
                return {
                    id: topic.id,
                    title: topic.title,
                    created_at: topic.created_at,
                    content: topic.content,
                    summary: topic.summary,
                    img: topic.img,
                    views: topic.views,
                    likes: topic.likes,
                    dislikes: topic.dislikes,
                    shares: topic.shares,
                    User: topic.User.fullname,
                    Type: topic.Type.name
                }
            })
            .then(topic => {
                models.Topic.update(
                    {
                        views: ++topic.views,
                    },
                    {
                        where: {id: topic.id}
                    }
                );
                return resolve(topic);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

exports.searchTopic = function (search_key) {
    return new Promise(function (resolve, reject) {
        models.Topic.findAll({
            attributes: ['id', 'title', 'created_at', 'content', 'views', 'likes', 'shares', 'summary', 'img'],
            include: [
                {
                    model: models.User,
                    required: true,
                    attributes: ['id', 'fullname'],
                    as: 'User'
                },
                {
                    model: models.Type,
                    required: false,
                    attributes: ['id', 'name']
                }
            ],
            where: {
                title: {[Op.like]: '%' + search_key + '%'},
                status: 1
            }
        })
            .then(topics => {
                if (JSON.stringify(topics) === '[]') {
                    throw {
                        message: errors.TOPIC_01,
                        code: 'TOPIC_01'
                    };
                }
                console.log(topics);
                let result = topics.map(topic => {
                    return {
                        id: topic.id,
                        title: topic.title,
                        content: topic.content,
                        summary: topic.summary,
                        img: topic.img,
                        views: topic.views,
                        likes: topic.likes,
                        shares: topic.shares,
                        author: topic.User.fullname,
                        type: topic.Type.name,
                        created_at: topic.created_at,

                    }
                })
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};
exports.addTopic = function (user_id, title, content, summary, img, type_id) {
    console.log("content " + content);
    return new Promise(function (resolve, reject) {
        models.Topic.findOne({
            attributes: ['title'],
            where: {
                title: title
            }

        })
            .then(topic => {
                if (topic != null) {
                    throw {
                        message: errors.TOPIC_01,
                        code: 'TOPIC_01'
                    };
                }
                var dt = dateTime.create();
                var formatted = dt.format('Y-m-d H:M:S');

                console.log(formatted);
                // console.log(locale);
                return models.Topic.create({
                    created_at: formatted,
                    title: title,
                    content: content,
                    summary: summary,
                    img: img,
                    type_id: type_id,
                    status: 0,
                    author_id: user_id
                });
            })
            .then(result => {
                if (result == null) {
                    throw {
                        message: errors.CREATE,
                        code: 'CREATE'
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

exports.getTop5Views = async function () {
    return new Promise(function (resolve, reject) {
        models.Topic.findAll({
            attributes: ['id', 'title', 'created_at', 'content', 'views', 'likes', 'shares', 'summary', 'img'],
            include: [
                {
                    model: models.User,
                    required: false,
                    attributes: ['id', 'fullname']
                },
                {
                    model: models.Type,
                    required: false,
                    attributes: ['id', 'name']
                }
            ],
            where: {
                status: 1,
            },
            limit: 5,
            order: [['views', 'DESC']],
        })
            .then(topics => {
                console.log("afdasdf");
                console.log(topics);
                let result = topics.map(topic => {
                    return {
                        id: topic.id,
                        title: topic.title,
                        content: topic.content,
                        summary: topic.summary,
                        img: topic.img,
                        views: topic.views,
                        likes: topic.likes,
                        shares: topic.shares,
                        author: topic.User.fullname,
                        type: topic.Type.name,
                        created_at: topic.created_at,

                    }
                });
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

exports.getTop5Likes = async function () {
    return new Promise(function (resolve, reject) {
        models.Topic.findAll({
            attributes: ['id', 'title', 'created_at', 'content', 'views', 'likes', 'shares', 'summary', 'img'],
            include: [
                {
                    model: models.User,
                    required: false,
                    attributes: ['id', 'fullname']
                },
                {
                    model: models.Type,
                    required: false,
                    attributes: ['id', 'name']
                }
            ],
            where: {
                status: 1,
            },
            limit: 5,
            order: [['likes', 'DESC']],
        })
            .then(topics => {
                console.log("afdasdf");
                console.log(topics);
                let result = topics.map(topic => {
                    return {
                        id: topic.id,
                        title: topic.title,
                        content: topic.content,
                        summary: topic.summary,
                        img: topic.img,
                        views: topic.views,
                        likes: topic.likes,
                        shares: topic.shares,
                        author: topic.User.fullname,
                        type: topic.Type.name,
                        created_at: topic.created_at,

                    }
                });
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

exports.getTopicsNotApproved = async function () {
    return new Promise(function (resolve, reject) {
        models.Topic.findAll({
            attributes: ['id', 'title', 'created_at', 'summary', 'img'],
            include: [
                {
                    model: models.User,
                    required: false,
                    attributes: ['id', 'fullname']
                },
                {
                    model: models.Type,
                    required: false,
                    attributes: ['id', 'name']
                }
            ],
            where: {
                status: 0,
            },
            limit: 5,
        })
            .then(topics => {
                console.log("afdasdf");
                console.log(topics);
                let result = topics.map(topic => {
                    return {
                        id: topic.id,
                        title: topic.title,
                        summary: topic.summary,
                        img: topic.img,
                        author: topic.User.fullname,
                        type: topic.Type.name,
                        created_at: topic.created_at,

                    }
                });
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

exports.approvedTopics = function (listID) {
    return new Promise(function (resolve, reject) {
        console.log("service " + listID);
        listID.map(topicID => {
            models.Topic.update({
                    updated_at: new Date(),
                    status: 1
                },
                {
                    where: {id: topicID}
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
    });
}

exports.getTopicByTypeID = function (type_id) {
    return new Promise(function (resolve, reject) {
        models.Topic.findAll({
            attributes: ['id', 'title', 'created_at', 'content', 'views', 'likes', 'shares', 'summary', 'img'],
            include: [
                {
                    model: models.User,
                    required: false,
                    attributes: ['id', 'fullname'],
                    as: 'User'
                },
                {
                    model: models.Type,
                    required: false,
                    attributes: ['id', 'name']
                }
            ],
            where: {
                type_id: type_id
            }
        })
            .then(topics => {
                if (JSON.stringify(topics) === '[]') {
                    throw {
                        message: errors.TOPIC_01,
                        code: 'TOPIC_01'
                    };
                }
                console.log("fdsgfdgdfhfg" + topics);
                let result = topics.map(topic => {
                    return {
                        id: topic.id,
                        title: topic.title,
                        content: topic.content,
                        summary: topic.summary,
                        img: topic.img,
                        views: topic.views,
                        likes: topic.likes,
                        shares: topic.shares,
                        author: topic.User.fullname,
                        type: topic.Type.name,
                        created_at: topic.created_at,

                    }
                })
                return resolve(result);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

exports.likeTopic = function (user_id, topic_id) {
    return new Promise(function (resolve, reject) {
        models.Topic.findOne({
            attributes: ['title', 'likes'],
            where: {
                id: topic_id
            }

        })
            .then(topic => {
                if (topic == null) {
                    throw {
                        message: errors.TOPIC_01,
                        code: 'TOPIC_01'
                    };
                }
                return models.Topic.update({
                        likes: ++topic.likes,
                    },
                    {
                        where: {id: topic_id}
                    });
            })
            .then(result => {
                if (result == null) {
                    throw {
                        message: errors.UPDATE,
                        code: 'UPDATE'
                    };
                }
                return models.Action.create({
                    topic_id: topic_id,
                    user_id: user_id,
                    created_at: new Date(),
                    action: "LIKE"
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

exports.dislikeTopic = function (user_id, topic_id) {
    return new Promise(function (resolve, reject) {
        models.Topic.findOne({
            attributes: ['title', 'dislikes'],
            where: {
                id: topic_id
            }

        })
            .then(topic => {
                if (topic == null) {
                    throw {
                        message: errors.TOPIC_01,
                        code: 'TOPIC_01'
                    };
                }
                return models.Topic.update({
                        dislikes: ++topic.dislikes,
                    },
                    {
                        where: {id: topic_id}
                    });
            })
            .then(result => {
                if (result == null) {
                    throw {
                        message: errors.UPDATE,
                        code: 'UPDATE'
                    };
                }
                return models.Action.create({
                    topic_id: topic_id,
                    user_id: user_id,
                    created_at: new Date(),
                    action: "DISLIKE"
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


