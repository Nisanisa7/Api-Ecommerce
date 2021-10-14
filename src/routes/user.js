const express = require('express')
const router = express.Router()
const userController = require('../controllers/Cuser')
const auth = require('../middleware/auth')


router
.get('/', userController.getAllUser)
.post('/register', userController.Register)
.post('/login', userController.Login)
.put('/:id', auth.verifyAccessAdmin, userController.updateUser)
.delete('/:id', auth.verifyAccessAdmin, userController.deleteUser)
.get('/verification/:token', userController.userActivation)

//Buyer Auth -------------------
.post('/register_buyer', userController.Register_buyer)
.post('/login_buyer', userController.Login_buyer)
.get('/custActivation/:token', userController.custActivation)
// .put('/change/:email', userController.changePastCust)

// -----------------------------------------------------
.get('/email', userController.forgotPassCust)
.put('/changePass', userController.changePassword)

//Seller Auth -----------------------
.post('/register_seller', userController.Register_seller)
.get('/sellerActivation/:token', userController.sellerActivation)
.post('/login_seller', userController.Login_seller)

.post('/refreshtoken', userController.RefreshToken)
module.exports = router



