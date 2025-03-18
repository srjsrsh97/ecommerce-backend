const express = require('express')
const purchaseController = require('../controller/purchase.controller')

const purchaseRouter = express.Router()

purchaseRouter.post('/placeOrder', purchaseController.placeOrder)
purchaseRouter.post('/updateOrder/:id', purchaseController.updateOrder)
purchaseRouter.post('/details/:id', purchaseController.getOrderDetails)
purchaseRouter.post('/detailsByUser', purchaseController.getOrderDetailsByUser)
purchaseRouter.post('/cancel/:id', purchaseController.cancelOrder)
purchaseRouter.post('/updateStatus/:id', purchaseController.updateOrderStatus)

module.exports = purchaseRouter