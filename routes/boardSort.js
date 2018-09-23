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

router.post('/',function(req,res){
  let sqlJoin=' SELECT * FROM board_db LEFT JOIN file_table ON board_db.content_serial_id=file_table.keyNum WHERE board_db.department=? ORDER BY timeSave DESC;';
  let department=req.body.department;
  pool.getConnection(async (err,connection) => {
    if(err) throw err;
    else{
      await connection.query(sqlJoin,[department],async function(err,result){
        if(err){
          console.log(err);
          console.log('join is fail');
        }
        else{
              console.log('sql sort is sucess');
              res.send(result);
            }
            connection.destroy();
          })
        }
      })
})







module.exports=router;
