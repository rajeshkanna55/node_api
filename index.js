const express=require('express');
const app=express();
const router=require("./users");
const router1=require('./node/routes/login');
const router2=require('./node/routes/resource');
const router3=require('./node/routes/files');
const router4=require('./node/routes/products');
const router5=require('./node/routes/edit');
const body=require('body-parser');
const cors=require('cors');
require('dotenv/config');

app.use(body.json());

app.use('/article_files',express.static('article_files'))
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

app.use("/register",router);
app.use('/logon',router1);
app.use('/resource',router2);
app.use('/content',router3);
app.use('/folder',router4);
app.use('/edit',router5);