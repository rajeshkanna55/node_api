const mongoose=require('mongoose');
const careers=new mongoose.Schema({
  
    company:{
      type: String,
      require: true
    },
    job:{
      type: String,
      require:true
    },
    logo:{
      type:String,
      require:true
    },
    qualification:{
      type: String,
      trim: true,
    },
    work:{
      type: String,
      require: true
    }
  });
  module.exports=mongoose.model('careers',careers);