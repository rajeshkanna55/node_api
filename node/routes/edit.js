const express=require('express');
const router=express.Router();
const content = require('../model/content');

router.get('/:id',async (req,res)=>{
    await content.findById(req.params.id)
    .then(result=>{
        res.send(result);
    });
});
router.put('/update/:id',async(req,res)=>{
         res.send(req.params.id);
         
});
module.exports = router;