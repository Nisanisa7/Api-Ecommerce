const express = require('express')
const router = express.Router()
const orderController = require('../controllers/Corder')



router
.get('/', orderController.getAllOrder)
.get('/:idorder', orderController.getOrderById)
.post('/', orderController.insertOrder)
.put('/:id', orderController.updateOrder)
.delete('/:id', orderController.deleteOrder)

module.exports = router