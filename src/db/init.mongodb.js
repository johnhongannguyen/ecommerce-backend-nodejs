'use strict'

const mongoose = require('mongoose');
const {db: {port,name,host}} = require('../configs/config.mongodb')

const {countConnect} =require('../helpers/check.connect')

const connectString = `mongodb://${host}:${port}/${name}`
console.log(`connectString:`, connectString)
class Database{
    constructor(){
        this.connect()
    }

    // connection
    connect(type = 'mongodb'){
        if(1 === 1){
            mongoose.set('debug',true)
            mongoose.set('debug', {color: true})
        }
        mongoose.connect(connectString,{
            maxPoolSize : 50
        })
        .then( _ => console.log(`Connected Mongodb Success at PRO`,countConnect()))
        .catch(err => console.log(`Connection Error`))
    }

    static getInstance() {
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb



