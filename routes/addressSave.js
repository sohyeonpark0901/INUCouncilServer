const express=require('express');
const router=express.Router();
var app=express();
var mysql=require('mysql');
var pool=mysql.createPool({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion',
  connectionLimit:10
});



router.post('/',function(req,res){
  var sql='INSERT INTO address_db (name,phone_number,email,position,etc) VALUES(?,?,?,?,?)';
  var name= req.body.name;
  var phone_number=req.body.phone_number;
  var email=req.body.email;
  var position=req.body.position;
  var etc=req.body.etc
  pool.getConnection((err,connection) =>{
    if(err) throw err;
    else{
  connection.query(sql,[name,phone_number,email,position,etc], function(err,result){
     if(err){
       console.log('AddressSave is fail');
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
