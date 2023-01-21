const express=require('express');
const router=express.Router();
const content = require('../model/content');
const verify=require('../routes/verify');
router.get('/:id',async (req,res)=>{
    await content.findById(req.params.id)
    .then(result=>{
        res.send(result);
    });
});
router.post('/update',verify,async(req,res)=>{
      console.log("hi");       
});
module.exports = router;