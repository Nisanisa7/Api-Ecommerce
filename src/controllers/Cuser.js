const connection = require('../configs/db')
const userModel = require('../models/Muser')
const { v4: uuidv4 } = require('uuid');

//get data from database ===============================
const getAllUser = (req, res, next) =>{
    userModel.getAllUser()
    .then((result)=>{
        const user = result
        res.status(200)
        res.json({
            message: 'success',
            data: user
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
//==========================================================
const insertUser = (req, res, next)=>{
    const {userName, email, password} = req.body
    const data = {
        idUser: uuidv4(),
        userName : userName,
        email : email,
        password : password
    }
    userModel.insertUser(data)
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
//==========================================================
const updateUser = (req, res, next)=>{
    const {userName, email, password} = req.body
    const id = req.params.id
    const data = {
        userName : userName,
        email : email,
        password : password
    }
    userModel.updateUser(id, data)
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
//delete product============================================

const deleteUser = (req, res)=>{
    const id = req.params.id
    userModel.deleteUser(id)
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

//========================================================
module.exports = {
    getAllUser,
    insertUser,
    updateUser,
    deleteUser
}