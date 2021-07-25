const multer = require('multer')
const storage = multer.diskStorage({
    destination : function{req, file, CD}{
        cb(null, 'tmp/my-uploads')

    },
})