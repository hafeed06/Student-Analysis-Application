const express = require('express');
var mongoose = require('mongoose');
const evaluationService = require('../service/evaluationService');
const courseService = require('../service/courseService');
const userService = require('../service/userService');
const typeCourseService = require('../service/typeCourseService');
const semesterService = require('../service/semesterService');
const markService = require('../service/markService');
const router = express.Router();
require('dotenv').config()
const multer = require('multer')
const csv_parser = require('csv-parser')
const csv = require('fast-csv')
const csvjson =require('csvtojson')
const fs = require('fs');
const { json } = require('body-parser');
const db = require('../config/db');
const Course = db.Course;
const Semester = db.Semester;
const Evaluation = db.Evaluation;

const Grades = db.Mark;



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

router.post('/', upload.single("file"), importCsv);
/**
 * @swagger
 * /upload/evaluation:
 *   post:
 *     summary: Create a evaluation 
 *     description: upload/evaluation in this api you provide those objects and the result
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: objectId
 *               course:
 *                 type: objectId
 *               result:
 *                 type: string
 *               date:
 *                 type: Date
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: {msg: "Evaluation json !"}
 */
router.post('/evaluation', evaluation);

async function importCsv(req, res) {
    console.log(req.files)
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
        const csvFile = req.files.file   
        var csvInfo = [];
        csvjson()
        .fromStream(req.files.file.data)
        .subscribe((json)=>{
            return new Promise((resolve,reject)=>{
                // long operation for each json e.g. transform / write into database.
                console.log(json)
            })
        }, onError, onComplete)
}

async function evaluation(req, res){
    try {
        console.log(req.body)
        const user = await userService.getByName(req.body.username);
        console.log(user)
        // validate
        if (!user) throw res.json({message: "User not found"});
        const course = await courseService.getByName(req.body.course)
        // validate
        if (!course) throw res.json({message: "course not found"});
        console.log(course)
        const evaluation = await evaluationService.getByCourseDate(course, req.body.date)
        // validate
        if (!evaluation)
        {
            throw res.json({message: "evaluation not found"});
        }
        else
        {
            const markParm = {
                "result": req.body.result,
                "dateResult": Date.now(),
                "user": mongoose.Types.ObjectId(user),
                "evaluation": mongoose.Types.ObjectId(evaluation)
            }
            try {
                const mark = markService.create(markParm)
                if(!mark) throw res.json({message: "mark error"})
                console.log(mark)
                return res.json({mark: mark})
            } catch (error) {
                res.send(error)
                console.log(error)
            }
        }
    } catch (error) {
        console.log(" error in the first phase")
    }
}