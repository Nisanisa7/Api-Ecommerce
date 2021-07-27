const connection = require('../configs/db')
const orderModel = require('../models/Morder')
const { v4: uuidv4 } = require('uuid');

//======================================================
const getOrderById = (req, res, next)=>{
    const id = req.params.idorder
   orderModel.getOrderById(id)
    .then((result)=>{
        const order = result
        res.status(200)
        res.json({
            message: 'success',
            data: order
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
//=========================================


//get data from database ===============================
const getAllOrder = (req, res, next) =>{
    const page = req.query.page || 1
    const search = req.query.search || ''
    const sortBy = req.query.sortBy || 'idOrder'
    const sort = req.query.sort|| 'ASC'
    const limit = req.query.limit || 5
    const offset = (page-1) * limit
    orderModel.getAllOrder(search, sortBy, sort, offset, limit)
    .then((result)=>{
        const order = result
        res.status(200)
        res.json({
            message: 'success',
            data: order
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
// INSERT DATA TO DB =======================================
const insertOrder = (req, res, next)=>{
    const {idUser, idProduct, status_order, orderQty} = req.body
    const data = {
        idOrder: uuidv4(),
        idUser : idUser,
        idProduct : idProduct,
        status_order : status_order,
        orderQty : orderQty,
        orderDate : new Date()
    }
   orderModel.insertOrder(data)
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
const updateOrder = (req, res, next)=>{
    const {idUser, idProduct, status_order} = req.body
    const id = req.params.id
    const data = {
        idUser : idUser,
        idProduct : idProduct,
        status_order : status_order,
        orderDate : new Date()
    }
   orderModel.updateOrder(id, data)
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
//delete Order============================================

const deleteOrder = (req, res)=>{
    const id = req.params.id
    orderModel.deleteOrder(id)
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



module.exports = {
    getAllOrder,
    insertOrder,
    updateOrder,
    deleteOrder,
    getOrderById
}