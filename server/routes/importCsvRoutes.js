const express = require('express');
const evaluationService = require('../service/evaluationService');
const router = express.Router();
require('dotenv').config()
const multer = require('multer')
const csv = require('fast-csv')
const fs = require('fs');
const { json } = require('body-parser');
const db = require('../config/db');
const User = db.User;



//multer upload storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir +'/public/')
    },
    filename: function(req, file, cb) {
        cb(null, file.filename +"-"+Date.now()+path.extname(file.originalname))
    }
})

//Filter for CSV file 
const csvFilter = (req, file, cb) =>{
    if(file.mimetype.includes("csv"))
    {
        cb(null,true);
    }else {
        cb("please insert only csv files", false);
    }
}

const upload = multer({
    storage,
    limits: {fileSize: 1000000}
});

module.exports = router;

router.post('/',upload.single('file'), importCsv);
router.post('/evaluation', evaluation);

function importCsv(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
        var csvFile = req.files.file;

        var csvInfo = [];
        //transform csv to string 
        csv.fromString(csvFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        //inserting data in each table
        .on("data", function(data){
            data['userName'] = new mongoose.Types.ObjectId();
            
            authors.push(data);
        });

}

async function evaluation(req, res){
    console.log(req.body)
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';

    return res.json()
}