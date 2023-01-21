const verify=(req,res,next)=>{
    const header=req.headers.authorization;
  
     if(header)
     {    
          req.token=header;
          next();
     }
     else{ 
        res.status(400).send('auth failed');

     }

}
module.exports= verify;