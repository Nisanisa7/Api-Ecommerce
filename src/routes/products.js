const express = require('express')
const router = express.Router()
const productController = require('../controllers/Cproduct')
const upload = require('../middleware/multer')
const auth = require('../middleware/auth')

router

.get('/', auth.verifyAccess, productController.getAllProduct)
.get('/:idproduct', productController.getProductById)
.post('/', auth.verifyAccess, auth.restrictTo('Admin', 'Seller'),  upload.single('image'), productController.insertProduct)
.put('/:id', upload.single('image'), productController.updateProduct)
.delete('/:id', productController.deleteProduct)


module.exports = router