const express = require('express');
const router = express.Router();
const content = require('../model/content');
const multer = require('multer');
const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log("destiantion");
      cb(null, "article_files")

    },
    filename: function (req, file, cb) {
      // console.log(file);
      cb(null, file.originalname)

    }
  })
}).single('file');

router.post('/', upload, async (req, res) => {
  const id = req.body.id;
  const check = req.file.originalname;
  const url = req.protocol + "://" + req.get("host");
  const docs = url + "/article_files/" + req.file.originalname;
  const files = new content({
    folder: req.body.foldername,
    filename: req.body.title,
    file: req.body.content,
    docs: docs
  });

  if (files.folder === "" && files.filename === "" && files.file === "" && files.docs === "") {
    res.json('please enter the fields');
  }
  else if (id) {
    await content.findOneAndUpdate({ _id: id }, {
      $set: {
        folder: req.body.foldername,
        filename: req.body.title,
        file: req.body.content,
        docs: docs
      }
    }).then(result=>res.status(200).send("updated successfully")).catch(err=>console.log(err));
  }

  else {
    await files.save();
    res.status(201).json("file saved successfully");
    res.end();

  }
});

router.get('/:folder', async (req, res) => {

  const foleders = await content.find({ folder: req.params.folder });
  if (foleders) {
    res.send(foleders);
  }
  else {
    res.json("internal server error");
  }
});

router.get('/download/:id', async (req, res) => {
  const lin = req.params.id;

  res.status(200).json('Download Completed');
});

router.get('/courses/get',async(req,res)=>{
  
  try{
    const getCourse=await content.find({})
    if(getCourse)
    {
      res.status(200).send(getCourse);
    }
    else{
      res.json('cannot get values');
    }
     
  }
catch(err){
  return res.send({
    message:"err:"+err,
  })
}

});
module.exports = router;    