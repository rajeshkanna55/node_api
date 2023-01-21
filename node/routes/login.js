const express = require('express');
const router = express.Router();
const register = require('../model/ main');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const decode=require('jwt-decode');
const verify=require('../routes/verify');
require('dotenv/config');
router.get('/', (req, res) => {
   res.send('another api created succesfully');
});
router.post('/', async (req, res) => {
    
   var Email = req.body.username;
   var Pass = req.body.password;
   const log=(token)=>{
      res.status(200).json(token);
      
   }
   const user=(token)=>{
      res.status(201).json(token);
   }
   const val=()=>{
       res.status(400).json('invalid username or password');
   }
   const nouser=()=>{
      res.status(401).json('please create account');
   }
   const wait= await register.findOne({ username: Email }).then( async (res) => {
      if(res!==null)
      {
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
       const data=res;
       const web=JSON.stringify(res);
       const token = jwt.sign(web, jwtSecretKey);
      const validPassword = await bcrypt.compare(Pass, data.password);
      if (data && validPassword && res.type==="User") {
           log(token);
           
         }
         else if(data && validPassword && res.type==="Admin")
         {
            user(token);
         }
         else {
            val();
         }
      }
      else{
         nouser();
      }
      
   });
});
router.get('/login',verify,async(req,res)=>{
   const data=decode(req.token);
    res.send(data);     
});

module.exports = router;