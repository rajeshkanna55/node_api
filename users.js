const express=require('express');
const router=express.Router();
const register=require('./node/model/ main');
const bcrypt=require('bcrypt'); 
router.get('/',(req,res)=>{
    res.send('hello');
});

router.get('/rajesh/find',(req,res)=>{
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
     
     console.log(req.body);
    var data=new register({
        type:req.body.type,
       username:req.body.username,
       email :req.body.email,
       password:req.body.password   
    });
    var user = await register.exists({ email: data.email });
    if(data===undefined){
       res.status(400).json('Server error');
    }  
    else if(user){
        res.status(304);
    }
   
   else{
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
        await data.save();
        res.status(201).json("data saved successfully");
        res.end();
    }
});


module.exports=router; 
