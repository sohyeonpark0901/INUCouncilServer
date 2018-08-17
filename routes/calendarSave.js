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
  let scheduleTitle=req.body.scheduleTitle;
  let time=req.body.time;
  let position=req.body.position;
  let memo=req.body.memo;
  let department=req.body.department;
  let sql='INSERT INTO calendar_db (scheduleTitle,time,position,memo,department) VALUES (?,?,?,?,?)';
  pool.getConnection(async (err,connection) =>{
    if(err) throw err;
    else{
      await connection.query(sql,[scheduleTitle,time,position,memo,department],function(err,result){
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
