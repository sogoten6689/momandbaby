'use strict';
const log4js = require('log4js');
const logger = log4js.getLogger();
const Promise = require('bluebird');
const auth_utils = require('../config/auth_utils');
const models = require('../db/models/index');
const errors = require('../lib/errors');

exports.successResponse = function (data = null) {
    if (data == null) {
        return {
            success: true
        };
    }

    return {
        success: true,
        data: data
    };
};

exports.failedResponse = function (error = null) {
    if (error != null) {
        if (error.name == 'SequelizeDatabaseError') {
            return {
                success: false,
                message: errors.SERVICE_01,
                code: 'SERVICE_01'
            };
        }

        if (error.name == 'JsonWebTokenError') {
            return {
                success: false,
                message: errors.AUTHORIZE_01,
                code: 'AUTHORIZE_01'
            };
        }

        if (error.message && error.code) {
            return {
                success: false,
                message: error.message,
                code: error.code
            };
        }

        if (error.message) {
            return {
                success: false,
                message: error.message,
                code: 'SERVICE_01'
            };
        }
        else{
            return {
                success: false,
                message: error,
                code: 'SERVICE_01'
            };
        }

    }

    return {
        success: false,
        message: errors.SERVICE_01,
        code: 'SERVICE_01'
    };
};
