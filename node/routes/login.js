const express=require('express');
const router=express.Router();
const register=require('../model/ main');
const bcrypt=require('bcrypt');
router.get('/',(req,res)=>{
   res.send('another api created succesfully');
});
router.post('/',async(req,res)=>{
       console.log(req.body);

       var Email=req.body.username;
       var Pass=req.body.password;
       var Email_id=await register.findOne({username:Email});


       const login=async(Email_id)=>{
         const validPassword = await bcrypt.compare(Pass, Email_id.password);
         
         if(validPassword){
            return res.status(200).json({
                  status:"success"
            })
             }
       }     
       if(Email_id){
         login(Email_id);
         return;
         }
       else{
          res.status(400).json("invalid username or password ");
       }
   
});
  
module.exports=router;