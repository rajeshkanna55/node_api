const express = require('express');
const router = express.Router();
const resource = require('../model/product');
const multer = require('multer');
const path=require('path');
const fs=require('fs');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            console.log(req.body);
            cb(null, "myfiles")
           
        },
        filename: function (req, file, cb) {
            console.log(file);
            cb(null,  file.originalname)
           
        }
    })
}).single('filename');
router.post('/uploads',upload, async(req, res) => {
    console.log(req.body);
    if(req.body.filename===undefined)
    {
        res.status(400).json('internal server error');
    }
    else{
        fs.readFile(req.body.filename, function (err, data){
        if(err)
        {
            console.log(err);
        }
        else{
            res.status(200).json('file received');
            var product =new resource({
                name: req.body.name,
                file: req.body.filename
            });
            console.log(product.file);
            
             product.save();
             res.end();  
        }
    });         
}
});

module.exports = router;