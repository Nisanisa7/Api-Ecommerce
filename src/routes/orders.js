const express = require('express')
const router = express.Router()
const orderController = require('../controllers/Corder')
const auth = require('../middleware/auth')
// const checkRole = require('../middleware/checkrole')



router
.get('/', orderController.getAllOrder)
.get('/:idorder', orderController.getOrderById)
.get('/custommer/:idCustommer', orderController.getOrderByCust)
.post('/', auth.verifyAccess, orderController.insertOrder)
.patch('/:idOrder', orderController.updateOrder)
.patch('/cancel/:idOrder', orderController.cancelOrder)
.delete('/:id', auth.verifyAccessSeller,  orderController.deleteOrder)

module.exports = router