const redis = require("redis")
const helpers = require('../helpers/helpers')
const client = redis.createClient();

const detailProduct = (req, res, next)=>{
  const id = req.params.idproduct
  console.log(id);
  client.get(`chaceProduct/${id}`, function(err, data) {
      if (data !== null){
        const result = JSON.parse(data)
        helpers.response(res, result, 200, {message: "Showing the detail product of " })
      } else {
        next()
      }
  
    });
}

const cacheProduct = (req, res, next)=>{
  client.get(`allProduct`, function(err, data) {
      if (data !== null){
        const result = JSON.parse(data)
        helpers.response(res, result, 200, {message: "Showing all product" })
      } else {
        next()
      }
  
    });
}

const cacheCategory = (req, res, next)=>{
  client.get(`allCategory`, function(err, data) {
      if (data !== null){
        const result = JSON.parse(data)
        helpers.response(res, result, 200, {message: "Showing all categories" })
      } else {
        next()
      }
  
    });
}
const detailCategory = (req, res, next)=>{
  const id = req.params.idcategory
  client.get(`chaceCategory/${id}`, function(err, data) {
      if (data !== null){
        const result = JSON.parse(data)
        helpers.response(res, result, 200, {message: "Showing the detail category of " +id })
      } else {
        next()
      }
  
    });
}



module.exports ={
    detailProduct,
    cacheCategory,
    detailCategory,
    cacheProduct
}