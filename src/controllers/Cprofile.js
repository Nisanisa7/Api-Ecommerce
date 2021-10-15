const connection = require('../configs/db')
const profileModel = require('../models/Mprofile')
const helpers = require('../helpers/helpers')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'nisanisa', 
    api_key: '415693727536492', 
    api_secret: 'unNAaDTSlWskGqW5JwnitPc6iPA',
    // secure: true
  });
//Seller

const getAllSeller = (req, res, next) =>{
    const page = parseInt(req.query.page) 
    const search = req.query.search || ''
    const sortBy = req.query.sortBy || 'idSeller'
    const sort = req.query.sort|| 'ASC'
    const limit = parseInt(req.query.limit)||10
    const offset = page ? page * limit :0;
    profileModel.getAllSeller(search, sortBy, sort, offset, limit)
    .then((result)=>{
        const seller = result
        const totalpages = Math.ceil(seller.count/limit)
        
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
            item: seller,

        })
    })
    .catch((error)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
    })
}
const getAdminByID = (req, res, next) =>{
    const idSeller = req.params.idSeller
    profileModel.getSellerID(idSeller)
    .then((result)=>{
        const seller = result
        helpers.response(res, seller, 200, {message: "Showing data user"})
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
} 
const updateSeller = async (req, res, next) =>{
    const idSeller = req.params.idSeller
    const {store_name, phone_number, store_description, } = req.body
    const {path} = req.file
    const UploadResponse = await cloudinary.uploader.upload(path, {upload_preset: 'blanja'})
    const data = {
        store_name: store_name, 
        phone_number: phone_number,
        store_description: store_description,
        image: UploadResponse.secure_url
    }
    console.log(data);
    profileModel.updateSeller(idSeller, data)
    .then(()=>{
        helpers.response(res, data, 200, {message: "Data Successfully Updated"})
    })
    .catch((error)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
        // fs.unlink(
        //     `./uploads/${req.file.filename}`, (err =>{
        //         if(err){
        //             console.log(err);
        //         }
        //     })
        // )
    })

}


// End of Controller Seller ------------------------
// Custommer Controller ---------------------------
const getAllCustommer = (req, res, next) =>{
    const page = parseInt(req.query.page) 
    const search = req.query.search || ''
    const sortBy = req.query.sortBy || 'idCustommer'
    const sort = req.query.sort|| 'ASC'
    const limit = parseInt(req.query.limit)||10
    const offset = page ? page * limit :0;
    profileModel.getAllCustommer(search, sortBy, sort, offset, limit)
    .then((result)=>{
        const custommer = result
        const totalpages = Math.ceil(custommer.count/limit)
        
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
            item: custommer,

        })
    })
    .catch((error)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
    })
}
const getCustommerByID = (req, res, next) =>{
    const idCustommer = req.params.idCustommer
    profileModel.getCustommerID(idCustommer)
    .then((result)=>{
        const custommer = result
        helpers.response(res, custommer, 200, {message: "Showing data user"})
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
} 
const updateCustommer = async (req, res, next) =>{
    const idCustommer = req.params.idCustommer
    let profile = ""
    let imageUserInput = ""
    const {path} = req.file
    const UploadResponse = await cloudinary.uploader.upload(path, {upload_preset: 'blanja'})
    if(!req.file){
        profile = ""
    } else {
        imageUserInput = UploadResponse.secure_url
    }
    console.log(imageUserInput);
    profileModel.getCustommerID(idCustommer)
    .then((result)=>{
        const oldImageProfile = result[0].image
        const newImageProfile = imageUserInput
        const {name, phone_number, gender, datebirth} = req.body
        if(imageUserInput == ""){
            profile = oldImageProfile
        } else {
            profile = newImageProfile
        }
        const data = {
            name: name, 
            phone_number: phone_number,
            gender: gender,
            datebirth: datebirth,
            image: profile
        }
        console.log(data);
        profileModel.updateCustommer(idCustommer, data)
        .then(()=>{
            helpers.response(res, data, 200, {message: "Data Successfully Updated"})
        })
        .catch((error)=>{
            console.log(error);
            helpers.response(res, null, 500, {message: 'internal server error'})
            // fs.unlink(
            //     `./uploads/${req.file.filename}`, (err =>{
            //         if(err){
            //             console.log(err);
            //         }
            //     })
            // )
        })
    })
}
const updateCustommerAddress = (req, res, next) =>{
    const idCustommer = req.params.idCustommer
    const {address} = req.body
    const data ={
        address: address
    }
    console.log(data);
    profileModel.updateAddress(idCustommer, data)
    .then(()=>{
        helpers.response(res, data, 200, {message: "Data Successfully Updated"})
    })
    .catch((err)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
    })
}

module.exports = {
    getAllSeller,
    updateSeller,
    getAdminByID,

    getAllCustommer,
    getCustommerByID,
    updateCustommer,
    updateCustommerAddress,
}