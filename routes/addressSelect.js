const express=require('express');
const router=express.Router();
var mysql=require('mysql');
var pool=mysql.createPool({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion',
  connectionLimit:10
});


router.post('/',function(req,res){
    var sql= 'select name FROM address_db ORDER BY name';
    var name= req.body.name;
    pool.getConnection((err,connection) =>{
      if(err) throw err;
      else{
    connection.query(sql,function(err,result){
      if(err){
        console.log('Address Seletion is fail');
      }else{
        console.log(result);
        res.send(result);
      }
      connection.destroy()
    })
}

    })
})




module.exports=router;