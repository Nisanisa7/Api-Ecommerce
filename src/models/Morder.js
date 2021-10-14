const connection = require('../configs/db')

const getOrderById =(id)=>{
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM orders where idOrder = ?",id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
 //======================================================== 
 const getOrderByCust =(id)=>{
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM orders where idCustommer = ?",id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
 //======================================================== 
const getAllOrder = (search, sortBy, sort,offset, limit) =>{
    return new Promise((resolve, reject)=>{
        const queryCount = ('SELECT count(*) as numRows FROM orders') 
        connection.query(`SELECT * FROM orders INNER JOIN custommer on orders.idCustommer = custommer.idCustommer WHERE orders.status_order LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`, [search, offset, limit], (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
// ========================================================
const insertOrder = (data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO orders SET ?', data, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
//==========================================================
// Update order ==========================================
const updateOrder = (data, idOrder)=>{
    console.log(data, 'ini dimodel');
    return new Promise((resolve, reject)=>{
        connection.query('UPDATE orders SET ? WHERE idOrder = ?', [data, idOrder], (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
// cancel order ==========================================
const cancelOrder = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query("UPDATE orders SET status_order = 'Cancelled' WHERE idOrder = ?", [id], (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
//========== delete order ================================
const deleteOrder = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query('DELETE FROM orders where idOrder = ?', id, (error, result)=>{
            if (!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
module.exports = {
    getAllOrder,
    insertOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    cancelOrder,
    getOrderByCust
}