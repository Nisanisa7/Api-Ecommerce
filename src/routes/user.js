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

module.exports = router



