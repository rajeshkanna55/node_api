const mongoose=require('mongoose');
  
const users=new mongoose.Schema({
  
  type:{
    type: String,
    require: true
  },
  username:{
    type: String,
  
    require:true
  },
  email:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true
  },
  password:{
    type: String,
    require: true
  }
});
module.exports=mongoose.model('register',users);