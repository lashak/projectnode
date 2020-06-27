'use strict'

const Joi = require('@hapi/joi');

const userinfo = require('../models/User');
const commonfun = require('../libraries/commonfunction');


exports.postUsers = {
    // validate: {
    //     payload: {
    //         username: Joi.string().required(),
    //         password: Joi.string().min(2).max(200).required(),
    //         location: Joi.string().max(200).required()
    //     }
    // },
    handler: async function (request, reply) {
        let response;
        await commonfun.insert(userinfo,[request.payload]).then(function (result) {
            response = {
                statusCode: 200,
                error: false,
                success: true,
                message: "user insert successfully",
                data: result
            }
        }).catch(err => {
            response = {
                statusCode: 400,
                error: true,
                success: false,
                message: "user can't inserted",
                data: err
            }
        });
        return reply.response(response);
    }
}
exports.getUsers = {
    
    handler: async function (request, reply) {
        let allData = {
            selectList: '*',
            //where: `lid='${request.params.id}'`
        }
        let response;
        await commonfun.commonSelectQuery(userinfo, null, allData).then((result) => {
            response = {
                statusCode: 200,
                error: false,
                success: true,
                message: "Get user List ",
                data: result
            }
        }).catch(err => {
            response = {
                statusCode: 400,
                error: true,
                success: false,
                message: "Can't get User List",
                data: err
            }
        });
        return reply.response(response);
        // return reply({edc: commonfun.encrypt(JSON.stringify(response))});
    }
}
