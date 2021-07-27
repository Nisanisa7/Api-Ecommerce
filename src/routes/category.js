const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/Ccategory')
const auth = require('../middleware/auth')
const redis = require("../middleware/redis")


router

.get('/',  redis.cacheCategory, categoryController.getAllCategory)
.get('/:idcategory', redis.detailCategory, categoryController.getCategoryByID)
.post('/', auth.verifyAccessAdmin, categoryController.insertCategory)
.put('/:id', auth.verifyAccessAdmin, categoryController.updateCategory)
.delete('/:id', auth.verifyAccessAdmin, categoryController.deleteCategory)

module.exports = router