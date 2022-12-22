const mongoose=require('mongoose');

const resources=new mongoose.Schema({
      name:
      {
        type:String,
        required:true
      },
      file:{
       type:String,
       required:true
      }
});
module.exports=mongoose.model('resource',resources);