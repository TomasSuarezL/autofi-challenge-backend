var express = require('express');
var router = express.Router();
const multer = require('multer')
var parser_controller = require('./parserController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.csv')
    }
})
const upload = multer({ storage: storage })

router.post('/csv', upload.single('data'), parser_controller.parse_csv)

module.exports = router;