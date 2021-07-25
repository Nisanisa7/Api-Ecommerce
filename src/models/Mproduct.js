const connection = require('../configs/db')


const getProductById =(id)=>{
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM product where idProduct = ?",id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
 //======================================================== 
const getAllProduct = (search, sortBy, sort,offset, limit) =>{
    return new Promise((resolve, reject)=>{
        const queryCount = ('SELECT count(*) as numRows FROM product') 
        connection.query(`SELECT * FROM product INNER JOIN category on product.idCategory = category.idCategory 
        WHERE product.productName LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`, [search, offset, limit], (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
//===========================================================
const insertProduct = (data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO product SET ?', data, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
//==========================================================
// Update Product ==========================================
const updateProduct = (id, data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('UPDATE product SET ? WHERE idProduct = ?', [data, id], (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}


//===========================================================



//========== delete Product ================================
const deleteProduct = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query('DELETE FROM product where idProduct = ?', id, (error, result)=>{
            if (!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
//==========================================================
module.exports = {
    getAllProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    getProductById
}