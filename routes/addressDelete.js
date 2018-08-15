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



router.post('/',function(req,res){
  var sql='DELETE FROM address_db WHERE name=?';
  var name= req.body.name;

  pool.getConnection((err,connection) =>{
    if(err) throw err;
    else{
  connection.query(sql,[name], function(err,result){
     if(err){
       console.log(err);
       console.log('AddressDelete is fail');
     }else{
       console.log(result);
       res.send(true);
     }
     connection.destroy()
   })
 }
  });


})



module.exports=router;
