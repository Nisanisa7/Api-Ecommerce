const express = require('express')
const router = express.Router()
const productController = require('../controllers/Cproduct')
const upload = require('../middleware/multer')
const auth = require('../middleware/auth')

router

.get('/', productController.getAllProduct)
.get('/:idproduct', productController.getProductById)
.post('/', auth.verifyAccessSeller,  upload.single('image'), productController.insertProduct)
.put('/:id', auth.verifyAccessSeller, upload.single('image'), productController.updateProduct)
.delete('/:id', auth.verifyAccessSeller, productController.deleteProduct)


module.exports = router