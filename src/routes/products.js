const express = require('express')
const router = express.Router()
const productController = require('../controllers/Cproduct')
const upload = require('../middleware/multer')
const auth = require('../middleware/auth')
const redis = require("../middleware/redis")
// const client = redis.createClient();

router

.get('/', productController.getAllProduct)
.get('/:idproduct', redis.detailProduct ,productController.getProductById)
.post('/', auth.verifyAccessSeller, upload.single('image'), productController.insertProduct)
.put('/:id', auth.verifyAccessSeller, upload.single('image'), productController.updateProduct)
.delete('/:id', auth.verifyAccessSeller, productController.deleteProduct)


module.exports = router