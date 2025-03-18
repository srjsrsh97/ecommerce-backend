const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_name:{
        type: String,
        required: true
    },
    price:{
        type: String,
    },
    seller:{
        type: String,
        required:true
    },
    is_available:{
        type: Boolean,
        default: true
    }
},{ timestamps: true })

const products = mongoose.model('products', productSchema)

module.exports = products