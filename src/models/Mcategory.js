const connection = require('../configs/db')

const getAllCategory = () =>{
    return new Promise((resolve, reject)=>{
     connection.query("SELECT * FROM category", (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
// ========================================================

const insertCategory = (data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO category SET ?', data, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
// ===========================================================
//Update Product
const updateCategory = (id, data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('UPDATE category SET ? WHERE idCategory = ?', [data, id], (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

//==========================================================
//========== delete Product ================================
const deleteCategory = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query('DELETE FROM category where idCategory = ?', id, (error, result)=>{
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
    getAllCategory,
    insertCategory,
    updateCategory,
    deleteCategory
}