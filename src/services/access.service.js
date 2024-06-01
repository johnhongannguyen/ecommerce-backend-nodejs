'use strict'
const shopModel = require('../models/shop.models');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const {getInfoData} = require('../utils/index');
const _ = require('lodash');
const { BadRequestError } = require('../core/error.response');
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}


class AccessService {
    static signUp = async ({name,email,password}) =>{
        try{
            // step1 : check email exists
            const shopHolder = await shopModel.findOne({email}).lean()
            if(shopHolder){
               throw new BadRequestError('Error: shop already registered!')
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name,email,password:passwordHash,roles:[RoleShop.SHOP]
            })

            if(newShop){
                //created privateKey - sign token, publicKey - verify token
                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')
                console.log({privateKey, publicKey})// save collection KeyStore
                
                // create public key
                const keyStorage = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })
                // check key if exists
                if(!keyStorage){
                    return{
                        code:'xxxx',
                        message: 'keyStorage error'
                    }
                }
                //created token pair
                const tokens = await createTokenPair({usedId: newShop._id,email},publicKey, privateKey)
                console.log(`Created Token Success::`, tokens)

                return{
                    code: 201,
                    metadata:{
                        shop: getInfoData({fields:['_id','name','email'], object: newShop}),
                        tokens
                    }
                }
                // const tokens = await 
            }

            return{
                code: 200,
                metadata: null
            }
        }catch(err){
            console.error(error)
            return{
                code:'xxx',
                message: err.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;