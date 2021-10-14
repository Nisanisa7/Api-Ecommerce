const jwt = require('jsonwebtoken')
const generateToken = (payload) =>{
    return new Promise((resolve, reject)=>{  
        const verifyOptions = {
            expiresIn: "2h",
            issuer: 'E-commerce' 
        } 
        jwt.sign(payload, process.env.SECRET_KEY, verifyOptions,
        function(err, token) {
            if(!err){
                resolve(token)
            }else{
                reject(err)
            }
        }
    );
    })
}
const generateRefreshToken = (payload) =>{
    return new Promise((resolve, reject)=>{  
        const verifyOptions={
            expiresIn: "24h",
            issuer: 'Blanja-E-commerce' 
        }  
        jwt.sign(payload, process.env.SECRET_KEY, verifyOptions,
        function(err, token) {
            if(!err){
                resolve(token)
            }else{
                reject(err)
            }
        }
    );
    })
}
module.exports ={
    generateToken,
    generateRefreshToken
}