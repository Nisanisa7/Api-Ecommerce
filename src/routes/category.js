const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/Ccategory')


router

.get('/', categoryController.getAllCategory)
.post('/', categoryController.insertCategory)
.put('/:id', categoryController.updateCategory)
.delete('/:id', categoryController.deleteCategory)

module.exports = router