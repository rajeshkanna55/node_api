const express = require('express');
const router = express.Router();
const content = require('../model/content');

router.post('/',(req,res)=>{
        const folder=req.body.folder;
        if(folder!==undefined){
          const files=new content({
               folder:folder,
               filename:req.body.tiTle,
               file:req.body.conTent     
          });
        }
        else{
          res.status(400).json("internal server error");
        }
   
});
module.exports = router;    