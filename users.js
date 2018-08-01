const express=require('express');
const app=express();
var mysql=require('mysql');

var conn=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion'
});
//비밀번호 암호화 시켜야됨!
var sql="INSERT INTO users (id,username,password) VALUES ?";
var values=[
  ['1','dcse0780','zjavb1698'], //컴퓨터 공학부
  ['2','dite0781','wjdqh0828'],//정보통신공학과
  ['3','dese0782','dlaqp1398']//임베디드 시스템 공학과
];
conn.connect();
conn.query(sql,[values],function(err){
  if(err) throw err;
  conn.end;
})
conn.end();
app.listen(7001,()=>console.log('Example listening on port 7001!'));
