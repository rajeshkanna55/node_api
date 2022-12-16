const express=require('express');
const app=express();
const router=require("./users");
const router1=require('./node/routes/login');
const router2=require('./node/routes/resource')
const body=require('body-parser');
const cors=require('cors');
require('dotenv/config');

app.use(body.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send('hello port created');
   
});
app.listen(4000);
 
const mongoose=require('mongoose');

mongoose.connect(process.env.MYDB_CONNECTION,(err)=>{
    if(err) throw err;
    console.log('db created');
});
//To create middleware (.use)
app.use("/register",router);
app.use('/logon',router1);
app.use('/resource',router2);