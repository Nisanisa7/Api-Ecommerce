const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/Ccategory')
const auth = require('../middleware/auth')
// const redis = require("../middleware/redis")


router

.get('/', categoryController.getAllCategory)
.get('/:idcategory', categoryController.getCategoryByID)
.post('/', auth.verifyAccessSeller, categoryController.insertCategory)
.put('/:id', auth.verifyAccessSeller, categoryController.updateCategory)
.delete('/:id', auth.verifyAccessSeller, categoryController.deleteCategory)

module.exports = router