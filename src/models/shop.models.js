'use strict'

// !dmbg
const {model, Schema, Types, Collection} = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops'


// Declare the Schema of the Mongo model
const shopSchema = Schema({
    name:{
        type:String,
        trim: true,
        maxLength: 150
    },
    email:{
        type:String,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required: [true, 'Path `password` is required']
    },
    // allow a shop to active or inactive
    status:{
        type: String,
        enum:['active','inactive'],
        default: 'inactive'
    },
    // verify success of shop registration
    verify:{
        type: Schema.Types.Boolean,
        default: false
    },
    // authorize for post,sell,delete,update products
    role:{
        type: Array,
        default: []
    }
},{
    timestamp: true,
    collection: COLLECTION_NAME
}

);

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);