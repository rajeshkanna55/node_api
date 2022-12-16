const express = require('express');
const router = express.Router();
const resource = require('../model/product');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(err, "uploads")
            console.log(err);
        },
        filename: function (req, file, cb) {
            cb(err, file.originalname)
           
        }
    })
}).single('file');

router.post('/uploads',upload, async(req, res) => {
    var product =new resource({
        name: req.body.name,
        file: req.body.filename
    });

    await product.save();
     res.end();  
});

module.exports = router;