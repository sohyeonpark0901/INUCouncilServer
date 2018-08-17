const express=require('express');
const router=express.Router();
var app=express();
var mysql=require('mysql');
/*var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
*/
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
/*passport.deserializeUser(function(id, done) {
  console.log('deserializeUser',id)
  var sql='SELECT * FROM users WHERE username=?';
  pool.getConnection((err,connection) =>{
    if(err) throw err;
    else{
      connection.query(sql,[id],function(err,results){
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
*/
router.post('/',function(req,res){
    let content_serial_id=req.body.content_serial_id;
    let sql='DELETE FROM board_db WHERE content_serial_id=?';
    let sqlFile='DELETE FROM file_table WHERE keyNum=?';

    pool.getConnection(async (err,connection) =>{
      if(err) throw err;
      else{
        await connection.query(sqlFile,[content_serial_id],async function(err,result){
          if(err){
            console.log(err);
            console.log('file_table Delete is fail');
          }
          else{
          await connection.query(sql,[content_serial_id],function(err,result){
              if(err){
                console.log(err);
                console.log('board_db Delete is fail');
              }
              else{
                console.log('sucess');
                res.send(true);
              }
              connection.destroy();
            })
          }
        })
      }
    })
})

module.exports=router
