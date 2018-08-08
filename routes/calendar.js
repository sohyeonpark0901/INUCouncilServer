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
  var sql='select * from calendar_db';
  pool.getConnection((err,connection) =>{
    if(err) throw err;
    else{
      connection.query(sql,function(err,result){
        if(err){
          throw err;
          return done('You can get calendar_db');
        }else{
          res.send(result);
        }
        connection.destroy();
      })
    }
  })
})

module.exports = router
