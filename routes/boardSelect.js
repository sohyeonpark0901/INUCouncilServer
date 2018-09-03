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
  let sql='SELECT b.*, GROUP_CONCAT(f.fileName ORDER BY b.content_serial_id) AS fileName FROM board_db b JOIN file_table f ON b.content_serial_id=f.keyNum WHERE b.department=? GROUP BY b.content_serial_id';


  let department=req.body.department;

  pool.getConnection(async (err,connection) => {
    if(err) throw err;
    else{
      await connection.query(sql,[department],async function(err,result){
        if(err){
          console.log(err);
          console.log('sql is fail');
        }
        else{
          
        }
        connection.destroy();
      })
    }
  })
})






module.exports=router;
