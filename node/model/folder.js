const mongoose=require('mongoose');
const folders=new mongoose.Schema({
    
    folder:
    {
        type:String,
        required:true
    },
    createdAt:
    {
        type:Date,
        required:true
    },
    updatedAt:{
        type:Date,
        required:true
    }
});
module.exports=mongoose.model('folders',folders);