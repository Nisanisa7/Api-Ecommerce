
const connection = require('../configs/db')
const productModel = require('../models/Mproduct')

//======================================================
const getProductById = (req, res, next)=>{
    const id = req.params.idproduct
    productModel.getProductById(id)
    .then((result)=>{
        const products = result
        res.status(200)
        res.json({
            message: 'success',
            data: products
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
//=====================================================

//get data from database ===============================
const getAllProduct = (req, res, next) =>{
    const page = parseInt(req.query.page) || 1
    const search = req.query.search || ''
    const sortBy = req.query.sortBy || 'idProduct'
    const sort = req.query.sort|| 'ASC'
    const limit = parseInt(req.query.limit)|| 15
    const offset = (page-1) * limit
    productModel.getAllProduct(search, sortBy, sort, offset, limit)
    .then((result)=>{
        const products = result
        res.status(200)
        res.json({
            message: 'success',
            data: products
        })
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message: error
        })
    })
}
//==========================================================
// INSERT DATA TO DB =======================================
const insertProduct = (req, res, next)=>{
    const {productName, description, brands, price, stock, idCategory, image} = req.body
    const data = {
        productName : productName,
        description : description,
        brands : brands,
        price : price,
        stock : stock,
        idCategory : idCategory,
        image : image,
        create_date : new Date(),
        updatedAt : new Date()
    }
    productModel.insertProduct(data)
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

//===========================================================
// UPDATE PRODUCT ===========================================
const updateProduct = (req, res, next)=>{
    const {productName, description, price, stock, idCategory, image} = req.body
    const id = req.params.id
    const data = {
        productName : productName,
        description : description,
        price : price,
        stock : stock,
        idCategory : idCategory,
        image : image,
        create_date : new Date(),
        updatedAt : new Date()
    }
    productModel.updateProduct(id, data)
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




//============================================================



//delete product============================================

const deleteProduct = (req, res)=>{
    const id = req.params.id
    productModel.deleteProduct(id)
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



//=========================================================

module.exports = {
    getAllProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    getProductById
} 