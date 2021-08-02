
const connection = require('../configs/db')
const productModel = require('../models/Mproduct')
const helpers = require('../helpers/helpers')
const fs = require('fs')
const redis = require("redis")
const client = redis.createClient();

//======================================================

const getProductById = (req, res, next)=>{
    const id = req.params.idproduct
    productModel.getProductById(id)
    .then((result)=>{
        const products = result
        client.set(`chaceProduct/${id}`, JSON.stringify(products));
        helpers.response(res, products, 200)
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
    const limit = parseInt(req.query.limit)||5
    const offset = page ? page * limit :0;
    productModel.getAllProduct(search, sortBy, sort, offset, limit)
    .then((result)=>{
        const products = result
        client.set(`allProduct/`, JSON.stringify(products));
        const totalpages = Math.ceil(products.count/limit)
        
        // client.set(`chaceProduct`, JSON.stringify(products));
        // console.log(products);
        res.status(200)
        res.json({
            "message": 'success',
            "totalpages": totalpages,
            "limit": limit,
            "currentpageNumber": page,
            "currentpageSize" : result.length,
            "totalItems" : result.count,
            item: products,

        })
    })
    .catch((error)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
    })
}
//==========================================================
// INSERT DATA TO DB =======================================
const insertProduct = (req, res, next)=>{
    const {productName, description, brands, price, stock, idCategory} = req.body
    const data = {
        productName : productName,
        description : description,
        brands : brands,
        price : price,
        stock : stock,
        idCategory : idCategory,
        image : req.file.filename,
        create_date : new Date(),
        updatedAt : new Date()
    }
    productModel.insertProduct(data)
    .then(()=>{
        helpers.response(res, data, 200, {message: "Data Successfully Inserted"})
    })
    .catch((error)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
        fs.unlink(
            `./uploads/${req.file.filename}`, (err =>{
                if(err){
                    console.log(err);
                }
            })
        )
    })
}

//===========================================================
// UPDATE PRODUCT ===========================================
const updateProduct = (req, res, next)=>{
    const {productName, description, price, brands, stock} = req.body
    const id = req.params.id
    const data = {
        productName : productName,
        description : description,
        brands : brands,
        price : price,
        stock : stock,
        // idCategory : idCategory,
        image : req.file.filename,
        create_date : new Date(),
        updatedAt : new Date()
    }
    productModel.updateProduct(id, data)
    .then(()=>{
        
        helpers.response(res, data, 200, {message: "Data Successfully Updated"})
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