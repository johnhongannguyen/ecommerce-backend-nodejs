'use strict'

const { findById } = require("../models/apikey.model")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (res,req,next) =>{
    try{
        const key = req.headers[HEADER.API_KEY]?.toString()
        if(!key){
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        // check objKey
        const objKey = await findById(key);
        if(!objKey){
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        req.objKey = objKey;
        return next();
    }catch(err){
        return err
    }
}

const permission = (permission) =>{
    return(req,res,next) =>{
        if(!req.objKey.permissions){
            return res.status(403).json({
                message: 'Permission denied'
            })
        }
        console.log('permission',req.objKey.permissions)
        const validPermission = req.objKey.permissions.include(permission)
        if(!validPermission){
            return res.status(403).json({
                message: 'Permission denied'
            })
        }
        return next();
    }
}

module.exports = {
    apiKey,
    permission
}