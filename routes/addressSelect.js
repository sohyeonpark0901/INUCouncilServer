const express=require('express');
const router=express.Router();
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
    var sql= 'SELECT * FROM address_db WHERE addressId=?';
    var name= req.body.addressId;
    pool.getConnection((err,connection) =>{
      if(err) throw err;
      else{
    connection.query(sql,[name],function(err,result){
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
      connection.destroy()
    })
}

    })
})




module.exports=router;
