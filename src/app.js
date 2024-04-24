const compression = require('compression');
const express = require('express')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan');

// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
// init db

// init routes 
app.get('/',(req,res,next)=>{
    const strCompress = 'Hello John';

    return res.status(200).json({
        message: 'Welcome home',
        metadata: strCompress.repeat(1000000)
    })
})
// handle error



module.exports = app