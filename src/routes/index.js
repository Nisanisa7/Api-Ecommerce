const express = require('express')
const route = express.Router()
const productRouter = require('./products')
const userRouter = require('./user')
const categoryRouter = require('./category')
const orderRouter = require('./orders')
const multer = require('../middleware/multer')
const profileRouter = require('./profileuser')

route 
    .use('/products', productRouter)
    .use('/user', userRouter)
    .use('/category', categoryRouter)
    .use('/orders', orderRouter)
    .use('/profile', profileRouter)
 
 

module.exports = route