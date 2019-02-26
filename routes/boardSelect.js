const express=require('express');
const router=express.Router();
var app= express();
var moment =require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var date = moment().format('YYYY-MM-DD HH:mm:ss');
var mysql=require('mysql');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var multer=require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'board_file_save/');
  },
  filename: function (req, file, cb) {
    cb(null,new Date().valueOf() + path.extname(file.originalname));
  }
})

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

router.post('/',function(req,res){
  let sql='SELECT * FROM board_db WHERE department=? ORDER BY date DESC';
  
  let sqlFile='SELECT * FROM file_table WHERE department=?';
  
  let department=req.body.department;
  
  
  pool.getConnection(async (err,connection) => {
    if(err) throw err;
    else{
      await connection.query(sql,[department],async function(err,resultPost){
        if(err){
          console.log(err);
          done('sql is fail');
        }
        else{

        await connection.query(sqlFile,[department],function(err,resultFile){
          if(err){
            console.log(err);
            console.log('sqlFile is fail');

          }
          else{

            for(i=0;i<resultPost.length;i++){
              let fileArray=[];
              for(j=0;j<resultFile.length;j++){
                if(resultPost[i].content_serial_id===resultFile[j].keyNum){
                  fileArray.push(resultFile[j].fileName);
                }
              }
            resultPost[i].fileName=fileArray;
            }
            res.send(resultPost);
            //console.log(resultPost);
          }
          connection.destroy();
        })
        }
      })
    }
  })
})






module.exports=router;
