const express=require('express');
const router=express.Router();
const register=require('./node/model/ main');
const bcrypt=require('bcrypt');
const moment = require('moment'); 
router.get('/',(req,res)=>{
    res.send('hello');
});

router.get('/rajesh',(req,res)=>{
    register.find()
    .then(result=>{
        res.status(200).json(result);
    })
.catch(err=>{
    console.log(err);
    res.status(400).json('there is some error');
});
});
router.get('/rajesh/:id',(req,res)=>{
    register.findById(req.params.id)
    .then(result=>{
        res.send(result);

    })
    .catch(err=>{
        res.status(400).json('no id in the data base');
    });
    
});
router.post('/rajesh',async(req,res)=>{
    const date = Date.now();
    const formatdate = moment(date).format('DD/MM/YYYY');
    var data=new register({
        type:req.body.type,
       username:req.body.username,
       email :req.body.email,
       password:req.body.password,
       admin: false,
       active: true,
       register_date: formatdate,
       last_login: formatdate  
    });
    var user = await register.findOne({ email:data.email });
    if(data===undefined){
       res.status(400).json('Server error');
    }  
    else if(user){
         res.status(401).json({
            message: "username is exist"
         })
        console.log("username exist");
    }
   
   else{
    const salt =await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
        await data.save();
        res.status(201).json("data saved successfully");
        res.end();
    }
});


module.exports=router; 
