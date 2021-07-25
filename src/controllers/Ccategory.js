const connection = require('../configs/db')
const categoryModel = require('../models/Mcategory')

// ===========================================
const getAllCategory = (req, res, next) =>{
    categoryModel.getAllCategory()
    .then((result)=>{
        const category = result
        res.status(200)
        res.json({
            message: 'success',
            data: category
        })
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
}
//========================================
//insert
const insertCategory = (req, res, next)=>{
    const {categoryName} = req.body
    const data = {
        categoryName : categoryName
    }
    categoryModel.insertCategory(data)
    .then(()=>{
        res.json({
            message: 'data berhasil di insert',
            data: data
        })
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message:'internal server error'
        })
    })
}

// UPDATE PRODUCT ===========================================

const updateCategory = (req, res, next)=>{
    const {categoryName} = req.body
    const id = req.params.id
    const data = {
        categoryName : categoryName
    }
    categoryModel.updateCategory(id, data)
    .then(()=>{
        res.json({
            message: 'data berhasil di Update',
            data: data
        })
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message:'internal server error'
        })
    })
}




//=======================================================
//========================================
const deleteCategory = (req, res)=>{
    const id = req.params.id
    categoryModel.deleteCategory(id)
    .then(()=>{
        res.status(200)
        res.json({
            message:  'data berhasil dihapus'
        })
    })
    .catch(()=>{
        console.log(err);
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
}
//==========================================================

module.exports = {
    getAllCategory,
    insertCategory,
    updateCategory,
    deleteCategory
}