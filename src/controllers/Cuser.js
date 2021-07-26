const connection = require('../configs/db')
const userModel = require('../models/Muser')
const helpers = require('../helpers/helpers')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
bcrypt = require('bcryptjs');

//get data from database ===============================
const getAllUser = (req, res, next) =>{
    userModel.getAllUser()
    .then((result)=>{
        const user = result
        helpers.response(res, user, 200)
    })
    .catch((error)=>{
        // console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
    })
}
// REGISTER ==========================================================
const Register = async (req, res, next)=>{
    const {userName, email, password, role} = req.body
    
    const user = await userModel.findUser(email)

    if(user.length > 0){
        return helpers.response(res, null, 401, {message:"This email address is already being used"})
    }

    console.log(user);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password , salt, function(err, hash) {
            // Store hash in your password DB.
            // console.log(hash);
            const data = {
                idUser: uuidv4(),
                userName : userName,
                email : email,
                password : hash,
                role : role
            }
            userModel.Register(data)
            .then((result)=>{
                delete data.password
                helpers.response(res, data , 200)
              
            })
            .catch((error)=>{
                console.log(error);
                helpers.response(res, null, 500, {message: 'internal server error'})
            })
        });
    });

}
// LOGIN ==========================================================

const Login = async (req, res, next) =>{
    const {email, password} = req.body
    const result = await userModel.findUser(email)
    // console.log(result);
    const user = result[0]
    // console.log(user.email);
    bcrypt.compare(password, user.password, function(err, resCompare) {
        if (!resCompare) {
            
            return helpers.response(res, null, 401, {message: 'Password wrong'})
        }

        // generate token
        jwt.sign({ email: user.email, role: '1' },
            process.env.SECRET_KEY, { expiresIn: "24h" },
            function(err, token) {
                console.log(token);
                console.log(process.env.SECRET_KEY);
                delete user.password;
                user.token = token;
                helpers.response(res, user, 200)
            }
        );
    });
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
    Register,
    updateUser,
    deleteUser, 
    Login
}