const connection = require('../configs/db')

// Seller Model
const getAllSeller = (search, sortBy, sort,offset, limit) =>{
    return new Promise((resolve, reject)=>{
        const queryCount = ('SELECT count(*) as numRows FROM seller') 
        connection.query(`SELECT * FROM seller WHERE  name LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`, [search, offset, limit], (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
const getSellerID = (idSeller) =>{
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM seller where idSeller = ?",idSeller, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      })
}
const updateSeller= (idSeller, data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('UPDATE seller SET ? WHERE idSeller = ?', [data, idSeller], (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

//end of seller model------------------------------
// Custommer Model

const getAllCustommer = (search, sortBy, sort,offset, limit) =>{
    return new Promise((resolve, reject)=>{
        const queryCount = ('SELECT count(*) as numRows FROM custommer') 
        connection.query(`SELECT * FROM custommer WHERE  name LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`, [search, offset, limit], (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
const getCustommerID = (idCustommer) =>{
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM custommer where idCustommer = ?",idCustommer, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      })
}
const updateCustommer= (idCustommer, data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('UPDATE custommer SET ? WHERE idCustommer = ?', [data, idCustommer], (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateAddress= (idCustommer, data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('UPDATE custommer SET ? WHERE idCustommer = ?', [data, idCustommer], (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    getAllSeller,
    updateSeller,
    getSellerID,


    getAllCustommer,
    getCustommerID,
    updateCustommer,
    updateAddress,
    
}