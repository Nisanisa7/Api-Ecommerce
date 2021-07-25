const express = require('express')
const router = express.Router()
const productController = require('../controllers/Cproduct')


router

.get('/', productController.getAllProduct)
.get('/:idproduct', productController.getProductById)
.post('/', productController.insertProduct)
.put('/:id', productController.updateProduct)
.delete('/:id', productController.deleteProduct)


module.exports = router