const express = require('express')
const userRouter = require('./user.routes')
const productRouter = require('./product.route')
const purchaseRouter = require('./purchase.routes')
const authRouter = require('./auth.route')


const router = express.Router()

const routes = [
    {
        path:'/auth',
        route: authRouter
    },
    {
        path:'/user',
        route: userRouter
    },
    {
        path:'/product',
        route: productRouter
    },
    {
        path:'/purchase',
        route: purchaseRouter
    }
]

routes.forEach(({path, route}) => router.use(path, route))

module.exports = router