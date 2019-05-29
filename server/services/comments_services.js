'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger();
const Promise = require('bluebird');
const auth_utils = require('../config/auth_utils');
const models = require('../db/models');
const errors = require('../lib/errors');
const dateTime = require('node-datetime');

exports.addComment = function (user_id, topic_id, content) {
    console.log("content " + content);
    return new Promise(function (resolve, reject) {
        models.User.findOne({
            attributes: ['email'],
            where: {
                id: user_id
            }

        })
            .then(user => {
                if (user == null) {
                    throw {
                        message: errors.USER_01,
                        code: 'USER_01'
                    };
                }
                return models.Topic.findOne({
                    attributes: ['title'],
                    where: {
                        id: topic_id
                    }

                })

            }).then(topic => {
            if (topic == null) {
                throw {
                    message: errors.TOPIC_01,
                    code: 'TOPIC_01'
                };
            }
            var dt = dateTime.create();
            var formatted = dt.format('Y-m-d H:M:S');

            console.log(formatted);
            // console.log(locale);
            return models.Comment.create({
                created_at: formatted,
                content: content,
                topic_id: topic_id,
                user_id: user_id
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

exports.getTopicCommentByTopicID = function (topic_id) {
    return new Promise(function (resolve, reject) {
        models.Topic.findOne({
            attributes: ['id'],
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
                return models.Comment.findAll({
                    attributes: ['id', 'topic_id', 'content', 'created_at'],
                    include: [
                        {
                            model: models.User,
                            required: true,
                            attributes: ['id', 'fullname'],
                            as: 'User'
                        }
                    ],
                    where: {
                        topic_id: topic_id
                    },
                    order: [['id']],

                });
            })
            .then(results => {
                console.log(results);
                let comments = results.map(comment => {
                    return {
                            id: comment.id,
                            topic_id: comment.topic_id,
                            content: comment.content,
                            comment: comment.comment,
                            user: comment.User,
                        };
                });

                return resolve(comments);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};

