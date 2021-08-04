const express = require('express')
const router = express.Router()
const userController = require('../controllers/Cuser')
const auth = require('../middleware/auth')


router
.get('/', auth.verifyAccessAdmin, userController.getAllUser)
.post('/register', userController.Register)
.post('/login', userController.Login)
.put('/:id', auth.verifyAccessAdmin, userController.updateUser)
.delete('/:id', auth.verifyAccessAdmin, userController.deleteUser)
.get('/verification/:token', userController.userActivation)

//Buyer Auth -------------------
.post('/register_buyer', userController.Register_buyer)
.post('/login_buyer', userController.Login_buyer)
.get('/custActivation/:token', userController.custActivation)

//Seller Auth -----------------------
.post('/register_seller', userController.Register_seller)

module.exports = router



