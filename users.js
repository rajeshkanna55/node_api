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

    console.log('hello');
    var data=new register({
       Name :req.body.Name,
       username:req.body.username,
       emailid :req.body.emailid,
       password:req.body.password   
    });
    var user = await register.exists({ emailid: req.body.emailid });
    if(data===undefined){
       res.status(400).json('Server error');
    }  
    else if(user){
         res.send('username already exists');
    }
    else if(data.emailid===undefined)
    {
        res.status(400).json('please enter valid email address');
    }
   else{
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
        await data.save();
        res.status(200).json("data saved successfully");
        res.end();
    }
});


module.exports=router; 
