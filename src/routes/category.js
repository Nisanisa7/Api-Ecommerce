const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/Ccategory')
const auth = require('../middleware/auth')


router

.get('/', categoryController.getAllCategory)
.post('/', auth.verifyAccessAdmin, categoryController.insertCategory)
.put('/:id', auth.verifyAccessAdmin, categoryController.updateCategory)
.delete('/:id', auth.verifyAccessAdmin, categoryController.deleteCategory)

module.exports = router