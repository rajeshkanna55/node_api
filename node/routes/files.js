const express = require('express');
const router = express.Router();
const content = require('../model/content');
const verify = require('../routes/verify');
const decode = require('jwt-decode');
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "article_files")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
}).single('file');

router.post('/', verify, upload, async (req, res) => {
  const data = decode(req.token);

  const id = req.body.id;
  const date = Date.now();
  const formatdate = moment(date).format('DD/MM/YYYY');
  if (id) {
    if (req.file !== undefined) {
      console.log('file with api');
      const url = req.protocol + "://" + req.get("host");
      const docs1 = url + "/article_files/" + req.file.originalname;
      await content.findOneAndUpdate({ _id: id }, {
        $set: {
          folder: req.body.foldername,
          filename: req.body.title,
          file: req.body.content,
          docs: docs1,
          user: data.username,
          createdAt: formatdate
        }
      }).then(result => res.status(202).json(result)).catch(err => console.log(err));
    }
    else {
      await content.findOneAndUpdate({ _id: id }, {
        $set: {
          folder: req.body.foldername,
          filename: req.body.title,
          file: req.body.content,
          user: data.username,
          createdAt: formatdate
        }
      }).then(result => res.status(202).json(result)).catch(err => console.log(err));
    }
  }

  else {
    if (req.file === undefined) {
      const files = new content({
        folder: req.body.foldername,
        filename: req.body.title,
        file: req.body.content,
        user: data.username,
        createdAt: formatdate
      });
      await files.save();
      res.status(200).json("file saved successfully");
      res.end();
    }
    else {
      console.log('file with api');
      const url = req.protocol + "://" + req.get("host");
      const docs = url + "/article_files/" + req.file.originalname;
      const files = new content({
        folder: req.body.foldername,
        filename: req.body.title,
        file: req.body.content,
        docs: docs,
        user: data.username,
        createdAt: formatdate
      });
      await files.save();
      res.status(200).json("file saved successfully");
      res.end();
    }
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

router.get('/courses/get', async (req, res) => {

  try {
    const getCourse = await content.find({})
    if (getCourse) {
      res.status(200).send(getCourse);
    }
    else {
      res.json('cannot get values');
    }

  }
  catch (err) {
    return res.send({
      message: "err:" + err,
    })
  }

});
module.exports = router;    