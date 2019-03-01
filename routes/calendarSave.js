const express=require('express');
const router=express.Router();
var app=express();
var dateFormat = require('dateformat')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mysql=require('mysql');
var pool=mysql.createPool({
  
}); 
passport.deserializeUser(function(department, done) {
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
  let scheduleTitle=req.body.scheduleTitle;
  let position=req.body.position;
  let memo=req.body.memo;
  let department=req.body.department;
  let startDate=req.body.startDate;
  let endDate=req.body.endDate;
  let startTime=req.body.startTime;
  let endTime=req.body.endTime;
  let sql='INSERT INTO calendar_db (scheduleTitle,startDate,startTime,endDate,endTime,position,memo,department) VALUES (?,?,?,?,?,?,?,?)';
  
  pool.getConnection(async (err,connection) =>{
    if(err) throw err;
    else{
      await connection.query(sql,[scheduleTitle,startDate,startTime,endDate,endTime,position,memo,department],function(err,result){
        if(err){
          throw err;
        }else{
          res.json({ans:true});
        }
        connection.destroy();
      })
    }
  })
})

module.exports = router
