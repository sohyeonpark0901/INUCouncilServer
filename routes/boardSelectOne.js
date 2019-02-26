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
  let sql='SELECT * FROM board_db WHERE content_serial_id=?&&department=?';
  let sqlFile='SELECT fileName FROM file_table WHERE keyNum=?';
  let content_serial_id=req.body.content_serial_id;
  let department=req.body.department;

  pool.getConnection(async (err,connection) => {
    if(err) throw err;
    else{
      await connection.query(sql,[content_serial_id,department],async function(err,result){
        if(err){
          console.log(err);
          console.log('sql is fail');
        }
        else{
          let sendObject=result[0];
          await  connection.query(sqlFile,[content_serial_id],function(err,result){
            if(err){
              console.log(err);
              console.log('sql select is fail');
            }else{
              let fileArray=[]
              result.map((file)=>{fileArray.push(file.fileName)})
              sendObject["fileName"] = fileArray;
              res.send(sendObject);
            }
            connection.destroy();
          })
        }
      })
    }
  })
})







module.exports=router;
