const multer = require('multer')
const helpers = require('../helpers/helpers')
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+ uuidv4() + '-' +file.originalname)
    }
  })
const maxSize = 2 * 1024 * 1024
const upload = multer({
  storage : storage,
  fileFilter: (req, file, cb) =>{
    if ( file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
           cb(null, true)
         } else{
           cb(null, false)
           return cb(new Error('Only png, jpg, and jpeg format allowed'))
         }
  },
  limits: {filesize: maxSize}

})
module.exports = upload