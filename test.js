const express=require('express');
const app=express();

app.get('/',(req,res)=>res.send('hello world'))

app.listen(7001,()=>console.log('Example app listening on port 7001!'));
