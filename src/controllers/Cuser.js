const connection = require('../configs/db')
const userModel = require('../models/Muser')
const helpers = require('../helpers/helpers')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const emailActivation = require('../helpers/emailActivation')
const ActivationCustommer = require('../helpers/ActivationCustommer')
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
// =====================================================================
const Register_buyer = async (req, res, next)=>{
    const {name, email, password} = req.body

    const buyer = await userModel.findBuyer(email)
    if (buyer.length > 0){
        return helpers.response(res, null, 401, {message:"This email address is already being used"})
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password , salt, function(err, hash) {
            // Store hash in your password DB.
            // console.log(hash);
            const data = {
                idCustommer: uuidv4(),
                name : name,
                email : email,
                password : hash,
                status: 'inactive',
                role : 'custommer'
            }
            userModel.Register_buyer(data)
            .then((result)=>{
                delete data.password
                jwt.sign({ email: data.email }, process.env.SECRET_KEY, function(err, token) {

                    ActivationCustommer.envoiEmail(data.email, data.name, token)
                  });

                helpers.response(res, data , 200, {message: "registration success! check your email for activation "})
              
            })
            .catch((error)=>{
                console.log(error);
                helpers.response(res, null, 500, {message: 'internal server error'})
            })
        });
    });

}
//Login Buyer---------------------------------------
const Login_buyer = async (req, res, next) =>{
    const {email, password } = req.body
    const result = await userModel.findBuyer(email)
    const user = result[0]
    // if(email == ''|| password == ''){
    //     helpers.response(res, null, 500, {message: 'Email or Password can not be empty'})
    // }
    if(result < 1){
        return helpers.response(res, null, 500, {message: "We couldn't find an account that matched the one you entered. please try again"})
    }
    bcrypt.compare(password, user.password, function(err, resCompare) {
        if (!resCompare) {      
            return helpers.response(res, null, 401, {message: 'Password wrong'})
        }

        // generate token
        jwt.sign({ email: user.email, role: 'custommer'},
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
// ========================================================================
const Register_seller = async (req, res, next)=>{
    const {name, email, phone_number, store_name, password} = req.body

    const seller = await userModel.findseller(email)
    if (seller.length > 0){
        return helpers.response(res, null, 401, {message:"This email address is already being used"})
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password , salt, function(err, hash) {
    
            const data = {
                idSeller: uuidv4(),
                name : name,
                email : email,
                phone_number: phone_number,
                store_name: store_name,
                password : hash,
                status: 'inactive',
                role : 'seller'
            }
            userModel.Register_seller(data)
            .then((result)=>{
                delete data.password
                // jwt.sign({ email: data.email }, process.env.SECRET_KEY, function(err, token) {

                //     emailActivation.sendEmail(data.email, data.userName, token)
                //   });

                helpers.response(res, data , 200, {message: "registered success!"})
              
            })
            .catch((error)=>{
                console.log(error);
                helpers.response(res, null, 500, {message: 'internal server error'})
            })
        });
    });

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
                status: 0,
                role : role
            }
            userModel.Register(data)
            .then((result)=>{
                delete data.password
                jwt.sign({ email: data.email }, process.env.SECRET_KEY, function(err, token) {

                    emailActivation.sendEmail(data.email, data.userName, token)
                  });

                helpers.response(res, data , 200, {message: "registered success! check your email for activation "})
              
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
    const {email, password, role, status} = req.body
    const result = await userModel.findUser(email)
    const user = result[0]
    if(email == ''|| password == ''){
        helpers.response(res, null, 500, {message: 'Email or Password can not be empty'})
    }
    else if(result < 1){
        return helpers.response(res, null, 500, {message: "We couldn't find an account that matched the one you entered. please try again"})
    }
    
    bcrypt.compare(password, user.password, function(err, resCompare) {
        if (!resCompare) {      
            return helpers.response(res, null, 401, {message: 'Password wrong'})
        }

        // generate token
        jwt.sign({ email: user.email, role},
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
    const {userName, email} = req.body
    const id = req.params.id
    const data = {
        userName : userName,
        email : email,
        // password : password
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
const userActivation = (req, res, next) =>{
    const token = req.params.token
    if(token){
        try{

            jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
                if(err) {
                
                    console.log(e);
                    return helpers.response(res, null, 500,{message: 'something went wrong'})
                
                }else{
                    email = decoded.email
                    console.log(email);
                    userModel.updateStatus(email)
                    .then(()=>{
                        helpers.response(res, null, 200, {message: "Your account has been successfully verified"})
                        // res.redirect('http://localhost3000/login')
                    })
                    .catch((err)=>{
                        console.log(err);
                        return helpers.response(res, null, 500, {message: "there's something wrong.."})
                    })
                }   
                 
              });
        } catch (err) {
           console.log(err);
           return helpers.response(res, null, 500, {message: 'something went wrong..'})
        }
    }
    
    // } else {
    //     return helpers.response(res, null, 403)
    // }
}
//--------------------------------------------------------
const custActivation = (req, res, next) =>{
    const token = req.params.token
    if(token){
        try{

            jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
                if(err) {
                
                    console.log(e);
                    return helpers.response(res, null, 500,{message: 'something went wrong'})
                
                }else{
                    email = decoded.email
                    console.log(email);
                    userModel.updateStatusCust(email)
                    .then(()=>{
                        // helpers.response(res, null, 200, {message: "Your account has been successfully verified"})
                        res.redirect('http://localhost:3000/activation_custommer')
                    })
                    .catch((err)=>{
                        console.log(err);
                        return helpers.response(res, null, 500, {message: "there's something wrong.."})
                    })
                }   
                 
              });
        } catch (err) {
           console.log(err);
           return helpers.response(res, null, 500, {message: 'something went wrong..'})
        }
    }
}
//========================================================
module.exports = {
    getAllUser,
    Register,
    updateUser,
    deleteUser, 
    Login,
    userActivation,
    Register_buyer,
    custActivation,
    Login_buyer,
    Register_seller

}