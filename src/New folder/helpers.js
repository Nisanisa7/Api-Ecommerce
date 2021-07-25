const response = (res, result, status, error) =>{
    const resultPrint = {}
    resultPrint.error = error || false
    resultPrint.status = status || 200
    resultPrint.message = message || null
    resultPrint.result = result || []
    res.status(status).json(resultPrint)
  }
  
  module.exports = {
    response
  }