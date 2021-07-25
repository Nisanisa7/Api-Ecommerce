const connection = require('../configs/db')

const getAllUser = () =>{
    return new Promise((resolve, reject)=>{
     connection.query("SELECT * FROM users", (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
// ========================================================
const insertUser = (data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO users SET ?', data, (error, result)=>{
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
const updateUser = (id, data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('UPDATE users SET ? WHERE idUser = ?', [data, id], (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
//========== delete Product ================================
const deleteUser = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query('DELETE FROM users where idUser = ?', id, (error, result)=>{
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
    getAllUser,
    insertUser,
    updateUser,
    deleteUser
}