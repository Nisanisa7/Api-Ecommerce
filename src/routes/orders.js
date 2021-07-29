const express = require('express')
const router = express.Router()
const orderController = require('../controllers/Corder')
const auth = require('../middleware/auth')
// const checkRole = require('../middleware/checkrole')



router
.get('/', orderController.getAllOrder)
.get('/:idorder', orderController.getOrderById)
.post('/', auth.verifyAccessCustomer, orderController.insertOrder)
.put('/:id', auth.verifyAccessAdmin, orderController.updateOrder)
.delete('/:id', auth.verifyAccessAdmin,  orderController.deleteOrder)

module.exports = router