const mongoose=require('mongoose');
  
const content=new mongoose.Schema({
       
        folder:{
            type:String,
            required:true
        },
        filename:{
            type:String,
            required:true
        },
        file:{
            type:String,
            required:true
        },
        docs:
        {
            type:String,
          
        },
        user:
        {
            type:String,
            required:true
        },
        createdAt:
        {
            type:String,
            required:true
        }
});

module.exports=mongoose.model('content',content);