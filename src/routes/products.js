const express = require('express')
const router = express.Router()
const productController = require('../controllers/Cproduct')
const upload = require('../middleware/multer')

router

.get('/', productController.getAllProduct)
.get('/:idproduct', productController.getProductById)
.post('/', upload.single('image'), productController.insertProduct)
.put('/:id', upload.single('image'), productController.updateProduct)
.delete('/:id', productController.deleteProduct)


module.exports = router