'use strict'
const shopModel = require('../models/shop.models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITE',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}


class AccessService {
    static signUp = async ({name,email,password}) =>{
        try{
            // step1 : check email exists
            const shopHolder = await shopModel.findOne({email}).lean()
            if(shopHolder){
                return{
                    code:'xxxx',
                    message: 'Shop already registered'
                }
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name,email,passwordHash,roles:[RoleShop.SHOP]
            })

            if(newShop){
                //created privateKey - sign token, publicKey - verify token
                const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                    modulusLength: 4096
                })
                console.log({privateKey, publicKey})// save collection KeyStore
                
                // create public key
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })
                if(!publicKeyString){
                    return{
                        code:'xxxx',
                        message: 'publicKeyString error'
                    }
                }
                //created token pair
                const tokens = await createTokenPair({usedId: newShop._id,email},publicKey, privateKey)
                console.log(`Created Token Success::`, tokens)

                return{
                    code: 201,
                    metadata:{
                        shop: newShop,
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
            return{
                code:'xxx',
                message: err.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;