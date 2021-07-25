const express = require('express')
const router = express.Router()
const userController = require('../controllers/Cuser')


router
.get('/', userController.getAllUser)
.post('/', userController.insertUser)
.put('/:id', userController.updateUser)
.delete('/:id', userController.deleteUser)

module.exports = router



