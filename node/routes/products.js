const express = require('express');
const verify=require('../routes/verify');
const router = express.Router();
const folders = require('../model/folder');
const decode=require('jwt-decode');
router.post('/products',verify, async (req, res) => {
    console.log(decode(req.token));
    const date = Date.now();
    const fname = new folders({
        folder: req.body.foldername,
        createdAt: date,
        updatedAt: date
    });
    const foldename = fname.folder;
    const foldname = await folders.exists({ folder: foldename });
    if (foldname) {
        res.status(400).json("file is exist");
    }
    else {
        await fname.save();
        res.status(200).json("product Added").end();;
    }
});

router.get('/products/name', async (req, res) => {
    const foleders = await folders.find({});
    if (foleders) {
       res.send(foleders);
    }
    else {
        res.json("internal server error");
    }

});
module.exports = router; 