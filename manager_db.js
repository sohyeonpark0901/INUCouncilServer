const express=require('express');
const app=express();
var mysql=require('mysql');

var conn=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion'
});

var sql="INSERT INTO manager_db (department,id,pw) VALUES ?";
var values=[
  ['computer science and engineering','dcse0780','zjavb1698'],
  ['information and telecommunication engineering','dite0781','wjdqh0828'],
  ['embedded systems engineering','dese0782','dlaqp1398']
];
conn.connect();
conn.query(sql,[values],function(err){
  if(err) throw err;
  conn.end;
})
conn.end();
app.listen(7001,()=>console.log('Example listening on port 7001!'));
