const express=require('express');
const app=express();
var mysql =require('mysql');


var conn=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion'
});
var sql='SELECT * FROM manager_db'
conn.connect();
conn.query(sql,function(err,rows,fields){
  if(err){
    console.log(err);
  }else{
    console.log('rows',rows);
  }
});



app.get('/',(req,res)=>res.send('hello world'));

app.listen(7001,()=>console.log('Example listening on port 7001!'));
