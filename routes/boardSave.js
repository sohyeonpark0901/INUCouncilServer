const express=require('express');
const router=express.Router();
var app= express();
var mysql=require('mysql');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var multer=require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'board_file_save/');
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
})

var upload = multer({ storage: storage })
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

router.post('/',upload.array('userfile',15), function(req,res){
    console.log('Uploaded:'+req.files[0].filename);

    var sql='INSERT INTO board_db (title,content,department) VALUES (?,?,?)';
    let sqlFile = 'INSERT INTO file_table (keyNum,fileName) VALUES ?'
    var title=req.body.title;
    var content=req.body.content;
    //var file=req.files[0].filename;
    var department=req.body.department;
    let Value = []


    pool.getConnection(async (err,connection) =>{
      if(err) throw err;
      else{
        await connection.query(sql,[title,content,department], async function(err,result){
          if(err){
            console.error(err)
            console.log('boardSave is fail');
          }
          else{
            await req.files.map(Data => Value.push([result.insertId,Data.filename]))
            await connection.query(sqlFile,[Value],function(err){
              if(err){
                console.log(err)
              }
              else{
                res.send(true);
                }
                connection.destroy();
            })
          }
        })//첫번째 쿼리 끝단
      }
    })
});


module.exports=router;
