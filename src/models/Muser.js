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
const Register_seller = (data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO seller SET ?', data, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
const findseller = (email)=>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM seller where email = ?', email, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
// ========================================================
const Register = (data)=>{
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
const findUser = (email)=>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM users where email = ?', email, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}

// const checkStatus = (status)=>{
//     return new Promise((resolve, reject)=>{
//         connection.query(`SELECT * FROM users where status = ?`, status, (error, result)=>{
//             if(!error){
//                 resolve(result)
//             } else{
//                 reject(error)
//             }
//         })
//     })
// }
//==========================================================
const Register_buyer = (data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO custommer SET ?', data, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
const findBuyer = (email)=>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM custommer where email = ?', email, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
//==========================================================

const updateStatus = (email)=>{
    return new Promise((resolve, reject)=>{
        connection.query(`UPDATE users SET status = 1 where email = ?`, email, (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
//---------------------------------------------------------
const updateStatusCust = (email)=>{
    return new Promise((resolve, reject)=>{
        connection.query(`UPDATE custommer SET status = 'Active' where email = ?`, email, (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
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
    Register,
    updateUser,
    deleteUser,
    findUser,
    updateStatus,
    Register_buyer,
    findBuyer,
    updateStatusCust,
    Register_seller,
    findseller
    // checkStatus
}