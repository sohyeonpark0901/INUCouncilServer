const express=require('express');
const router=express.Router();
var app=express();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mysql=require('mysql');
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
  var sql='INSERT INTO fcm_db (token,department) VALUES(?,?) ON DUPLICATE KEY UPDATE department=?';
  var token=req.body.token;
  var department=req.body.department;
  pool.getConnection((err,connection) =>{
    if(err) throw err;
    else{
  connection.query(sql,[token,department,department], function(err,result){
     if(err){
       console.log(err)
       console.log('tokenSave is fail');
     }else{
       res.json({ans:true});
     }
     connection.destroy()
   })
 }
  });


})



module.exports=router;
