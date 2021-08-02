
const jwt = require('jsonwebtoken')
const helpers = require('../helpers/helpers')


const authPage = (...roles)=>{
    return (req, res, next)=>{
        const roleCustommer = req.body.role
        console.log(roleCustommer);
        if(!roles.includes(roleCustommer)){
            return helpers.response(res, null, 403, {message:"You do not have a permission to perform this action"})
        }
        else(next)
    }
}

module.exports = {
    authPage
}