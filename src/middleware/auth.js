
const jwt = require('jsonwebtoken')
const helpers = require('../helpers/helpers')


const verifyAccess = (req, res, next)=>{
  const token = req.headers.authorization
  if (!token){
    const error = new Error('server need token')
    error.code = 401
    return next(error)
  }
  const result = token.split(' ')[1]
  console.log(result);
  jwt.verify(result, process.env.SECRET_KEY, function (err, decoded) {
    if(err){
        if(err.name === 'TokenExpiredError'){

            const error = new Error('token expired')
            error.status = 401
            return next(error)

        } else if (err.name === 'JsonWebTokenError'){
          
            const error = new Error('token Invalid')
            error.status = 401
            return next(error)

        } else{
            const error = new Error('token not active')
            error.status = 401
            return next(error)
        }
     
    }
    console.log(decoded.role);
    if(decoded.role == 'custommer'){

        next()

    }else{
        return helpers.response(res, null, 403, {message:"You do not have a permission to perform this action"})
    }
  });
} 

const verifyAccessAdmin = (req, res, next)=>{
  const token = req.headers.authorization
  if (!token){
    const error = new Error('server need token')
    error.code = 401
    return next(error)
  }
  const result = token.split(' ')[1]
  console.log(result);
  jwt.verify(result, process.env.SECRET_KEY, function (err, decoded) {
    if(err){
        if(err.name === 'TokenExpiredError'){

            const error = new Error('token expired')
            error.status = 401
            return next(error)

        } else if (err.name === 'JsonWebTokenError'){
          
            const error = new Error('token Invalid')
            error.status = 401
            return next(error)

        } else{
            const error = new Error('token not active')
            error.status = 401
            return next(error)
        }
     
    }
    console.log(decoded.role);
    if(decoded.role == 'Admin'){

        next()

    }else{
        return helpers.response(res, null, 403, {message:"You do not have a permission to perform this action"})
    }
  });
} 

const verifyAccessCustomer = (req, res, next)=>{
    const token = req.headers.authorization
    if (!token){
      const error = new Error('server need token')
      error.code = 401
      return next(error)
    }
    const result = token.split(' ')[1]
    console.log(result);
    jwt.verify(result, process.env.SECRET_KEY, function (err, decoded) {
      if(err){
          if(err.name === 'TokenExpiredError'){
  
              const error = new Error('token expired')
              error.status = 401
              return next(error)
  
          } else if (err.name === 'JsonWebTokenError'){
            
              const error = new Error('token Invalid')
              error.status = 401
              return next(error)
  
          } else{
              const error = new Error('token not active')
              error.status = 401
              return next(error)
          }
       
      }
      console.log(decoded.role);
      if(decoded.role == 'custommer'){
  
          next()
          
      }else{
          return helpers.response(res, null, 403, {message:"You do not have a permission to perform this action"})
      }
    });
  }
   
  const verifyAccessSeller = (req, res, next)=>{
    const token = req.headers.authorization
    if (!token){
      const error = new Error("server need token")
      error.code = 401
      return next(error)
    }
    const result = token.split(' ')[1]
    console.log(result);
    jwt.verify(result, process.env.SECRET_KEY, function (err, decoded) {
      if(err){
          if(err.name === 'TokenExpiredError'){
  
              const error = new Error("token expired")
              error.status = 401
              return next(error)
  
          } else if (err.name === 'JsonWebTokenError'){
            
              const error = new Error('token Invalid')
              error.status = 401
              return next(error)
  
          } else{
              const error = new Error('token not active')
              error.status = 401
              return next(error)
          }
       
      }
      console.log(decoded.role);
      if(decoded.role == 'seller'){
  
          next()
          
      }else{
          return helpers.response(res, null, 403, {message:"You do not have a permission to perform this action"})
      }
    });
  } 


module.exports ={
  verifyAccess,
  verifyAccessAdmin,
  verifyAccessCustomer,
  verifyAccessSeller
//   restrictTo
}