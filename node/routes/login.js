const express=require('express');
const router=express.Router();
const register=require('../model/ main');
const bcrypt=require('bcrypt');
router.get('/',(req,res)=>{
   res.send('another api created succesfully');
});
router.post('/',async(req,res)=>{
       var Email=req.body.email;
       var Pass=req.body.password;
       var Email_id=await register.findOne({emailid:Email});


       const login=async(Email_id)=>{
         const validPassword = await bcrypt.compare(Pass, Email_id.password);
         
         if(validPassword){
            return res.status(200).json({
                  status:"succes"
            })
             }
             else{
               res.send(400).json("plz check the password")
             }
       }     
       if(Email_id){
         login(Email_id);
         return;
         }
       else{
       res.status(400).json('bad request');
       }
   
});
  
module.exports=router;