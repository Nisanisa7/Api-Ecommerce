const connection = require('../configs/db')
const categoryModel = require('../models/Mcategory')
const helpers = require('../helpers/helpers')
const redis = require("redis")
const client = redis.createClient();

const getCategoryByID = (req, res, next)=>{
    const id = req.params.idcategory
    categoryModel.getCategoryByID(id)
    .then((result)=>{
        const category = result
        client.set(`chaceCategory/${id}`, JSON.stringify(category));
        helpers.response(res, category, 200, {message: "showing category detail of " +id})
    })
    .catch((error)=>{
        
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
    })

}

// ===========================================
const getAllCategory = (req, res, next) =>{
    categoryModel.getAllCategory()
    .then((result)=>{
        const category = result
        client.set(`allCategory`, JSON.stringify(category));
        helpers.response(res, category, 200)
    })
    .catch((error)=>{
        console.log(error);``
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
}

// ===========================================
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
    deleteCategory,
    getCategoryByID
}