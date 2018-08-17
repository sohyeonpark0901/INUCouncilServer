const express=require('express');
const router=express.Router();
var app=express();
/*var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
*/
var mysql=require('mysql');
var pool=mysql.createPool({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion',
  connectionLimit:10
});
/*
passport.deserializeUser(function(id, done) {
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

let scheduleId=req.body.scheduleId;


  let sql='DELETE FROM calendar_db WHERE scheduleId=?';
  pool.getConnection((err,connection) =>{
    if(err) throw err;
    else{
      connection.query(sql,[scheduleId],function(err,result){
        if(err){
          throw err;
        }else{
          res.send(true);
        }
        connection.destroy();
      })
    }
  })
})

module.exports = router
