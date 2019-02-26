const express=require('express');
const router=express.Router();
var app= express();

var moment =require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var mysql=require('mysql');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var multer=require('multer');
var path=require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'board_file_save/');
  },
  filename: function (req, file, cb) {
    cb(null,new Date().valueOf() + path.extname(file.originalname));
  }
})

const fcm = require('./fcm')
var upload = multer({ storage: storage })
var pool=mysql.createPool({
  host:'',
  user:'',
  password:'',
  database:'',
  connectionLimit:10
}); 
passport.deserializeUser(function(department, done) {
  console.log('deserializeUser',department)
  var sql='SELECT * FROM users WHERE username=?';
  pool.getConnection((err,connection) =>{
    if(err) throw err;
    else{
      connection.query(sql,[department],function(err,results){
        if(err){
          console.log(err);
          done('There is no user des');
        } else{
          done(null,results[0]);
        }
        connection.destroy();
      })

    }
  });

});

router.post('/',upload.array('userfile',15), function(req,res){


    let sql='INSERT INTO board_db (title,content,department,date) VALUES (?,?,?,?)';
    let sqlFile = 'INSERT INTO file_table (keyNum,fileName,department) VALUES ?';
    
    let dateSave = moment().format('YYYY-MM-DD HH:mm:ss');

    let title=req.body.title;
    let content=req.body.content;
    let department=req.body.department;
    
    let Value = []

       pool.getConnection(async (err,connection) =>{
         if(err) throw err;
         else{
          await connection.query(sql,[title,content,department,dateSave], async function(err,result){
             if(err){
               console.log(err);

            }
            else if(req.files == null || req.files == undefined || req.files == "" ){

              if(err) throw err;
              else{
                await fcm(department);
                    console.log('Except file boardSave and fcm is sucess');

                res.json({ans:true});
              }
              connection.destroy();
            }

           else {
             console.log(result);
                await req.files.map(Data => Value.push([result.insertId,Data.filename,department]))
                await connection.query(sqlFile,[Value], async function(err){
                 if(err){
                    console.log(err);
                    console.log('query err')
                   }
                   else{
                    await fcm(department);
                    console.log('boardSave and fcm is sucess');
                     res.json({ans:true});
                     }
                     connection.destroy();
               })
             }

           })

         }
       })
   });

module.exports=router;
