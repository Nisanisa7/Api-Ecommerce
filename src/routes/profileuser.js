const express = require('express')
const router = express.Router()
const profileController = require('../controllers/Cprofile')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')

router
//seller
.get('/', profileController.getAllSeller)
.get('/:idSeller', profileController.getAdminByID)
.patch('/:idSeller', upload.single('image'), profileController.updateSeller)


//Custommer
.get('/custommer/', profileController.getAllCustommer)
.get('/custommer/:idCustommer', profileController.getCustommerByID)
.put('/update/:idCustommer', upload.single('image'), auth.verifyAccessCustomer, profileController.updateCustommer)
.put('/address/:idCustommer', auth.verifyAccessCustomer, profileController.updateCustommerAddress)
module.exports = router