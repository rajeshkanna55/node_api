const mongoose=require('mongoose');

const products=new mongoose.Schema({
    product_Name:{
        type: String,
        require: true
    },
    img:{
        data: Buffer,
        contentType: String
    },
    size:{
        
    }
})