const express = require('express')
const userController = require('../controller/user.controller')

const userRouter = express.Router()

userRouter.post('/register', userController.register)
userRouter.post('/list', userController.listUser)
userRouter.post('/update', userController.updateUser)
userRouter.post('/delete', userController.deleteUser)

module.exports = userRouter