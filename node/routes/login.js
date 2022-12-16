const express = require('express');
const router = express.Router();
const register = require('../model/ main');
const bcrypt = require('bcrypt');
router.get('/', (req, res) => {
   res.send('another api created succesfully');
});
router.post('/', async (req, res) => {
   console.log(req.body);
    
   var Email = req.body.username;
   var Pass = req.body.password;
   const log=()=>{
      res.status(200).json('USER');
   }
   const user=()=>{
      res.status(201).json('ADMIN');
   }
   const val=()=>{
       res.status(400).json('invalid username or password');
   }
   var Email_id = await register.findOne({ username: Email }).then(async (res) => {
      console.log(res)
      const data = res;
      const type=data.type;
      console.log(type);
      const validPassword = await bcrypt.compare(Pass, data.password);
      console.log(validPassword);
      if (data && validPassword && type==="User") {
           log();
         }
         else if(data && validPassword && type==="Admin")
         {
            user();
         }
         else {
            val();
         }
      
   });
});


module.exports = router;