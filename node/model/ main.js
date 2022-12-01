const mongoose=require('mongoose');
  
const users=new mongoose.Schema({
  Name:{
    type: String,
    require:true
  },
  username:{
    type: String,
  
    require:true
  },
  emailid:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password:{
    type: String,
    require: true
  }
});
module.exports=mongoose.model('register',users);