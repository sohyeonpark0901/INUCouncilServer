const express=require('express');
const router=express.Router();
var app=express();
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
  var sql='UPDATE address_db SET name=?,phoneNumber=?,email=?,position=?,etc=?,department=? WHERE addressId=?';
  var name= req.body.name;
  var phoneNumber=req.body.phoneNumber;
  var email=req.body.email;
  var position=req.body.position;
  var etc=req.body.etc;
  var department=req.body.department;
  var addressId=req.body.addressId;
  pool.getConnection((err,connection) =>{
    if(err) throw err;
    else{
  connection.query(sql,[name,phoneNumber,email,position,etc,department,addressId], function(err,result){
     if(err){
       console.log(err);
     }else{
      
       if(result.affectedRows===0){
         console.log('AddressModify is fail');
       }
       else{
        res.json({ans:true});
       }
     }
     connection.destroy()
   })
 }
  });


})



module.exports=router;
