const express=require('express');
const router=express.Router();
var app= express();
var mysql=require('mysql');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var multer=require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'board_file_save/');
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
})

var upload = multer({ storage: storage })
var pool=mysql.createPool({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion',
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

router.post('/',upload.array('userfile',15),function(req,res){
    let content_serial_id=req.body.content_serial_id;
    let title=req.body.title;
    let content=req.body.content;
    //var file=req.files;
    let department=req.body.department;
    let Value = []
    let sqlUpdate='UPDATE board_db set title=?,content=?,department=? WHERE content_serial_id=?';
    let sqlFileDelete='DELETE FROM file_table WHERE keyNum=?';
    let sqlFileInsert='INSERT INTO file_table (keyNum,fileName,department) VALUES ?';
    pool.getConnection(async (err,connection) =>{
      if(err) throw err;
      else{
       await connection.query(sqlFileDelete,[content_serial_id],async function(err,result){
         if(err) throw err;
         else{
           console.log('file_table Delete is sucess');
         }
       })
       await connection.query(sqlUpdate,[title,content,department,content_serial_id], async function(err,result){
          if(err){
            console.log(err);
         }
         else if(req.files == null || req.files == undefined || req.files == "" ){
           if(err) throw err;
           else{
                 console.log('only board_db is sucess');
                   res.json({ans:true});
           }
           connection.destroy();
         }
         else {
              await req.files.map(Data => Value.push([content_serial_id,Data.filename,department]))
              await connection.query(sqlFileInsert,[Value],function(err){
               if(err){
                  console.log(err);
                  console.log('query err')
                 }
                 else{
                   res.json({ans:true});
                   }
                   connection.destroy();
             })
           }
           //else끝
        })

      }
    })
})


module.exports=router;
