const express = require('express')
const productController = require('../controller/products.controller')

const productRouter = express.Router()

productRouter.post('/create', productController.createProduct)
productRouter.post('/list', productController.listProducts)
productRouter.post('/update/:id', productController.updateProduct)
productRouter.post('/delete/:id', productController.deleteProduct)

module.exports = productRouter