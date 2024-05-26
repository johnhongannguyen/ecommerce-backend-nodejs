require('dotenv').config()
const compression = require('compression');
const express = require('express')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan');


// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
// init db
require('./db/init.mongodb');
// const {checkOverload} = require('./helpers/check.connect')
// checkOverload()
// init routes 
app.use('/',require('./routes/index'))
// handle error



module.exports = app