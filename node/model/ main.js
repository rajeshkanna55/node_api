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
  },
  admin:{
   type:Boolean
  },
  active:{
    type:Boolean
  },
  register_date:{
    type:String
  },
  last_login:{
    type : String
  }
});
module.exports=mongoose.model('register',users);