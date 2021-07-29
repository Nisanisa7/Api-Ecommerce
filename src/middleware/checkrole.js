
// const jwt = require('jsonwebtoken')
// const helpers = require('../helpers/helpers')


// const authPage = (...roles)=>{
//     return (req, res, next)=>{
//         const roleUser = req.body.role
//         jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
//             if(decoded.role == roles.includes(roleUser)){
//                 next()
//             }
//             else{
//                 return helpers.response(res, null, 403, {message:"You do not have a permission to perform this action"})
//             }
//           });
//     }
// }

// module.exports = {
//     authPage
// }