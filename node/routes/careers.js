const express = require('express');
const router = express.Router();
const careers = require('../model/career');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, "myfiles")

  },
  filename: function (req, file, cb) {

    cb(null, file.originalname)

  }

})
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}
const upload = multer({
  storage: storage,
  filefilter: fileFilter
}).single('logo');
router.post('/', upload, async (req, res) => {

  const url = req.protocol + "://" + req.get("host");
  const logo = url + "/myfiles/" + req.file.originalname;
  try {
    const jobs = new careers({
      company: req.body.com,
      logo: logo,
      job: req.body.job,
      qualification: req.body.qual,
      work: req.body.work
    });
  }
  catch (err) {
    console.log(err);
  }
});
module.exports = router;