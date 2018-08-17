const express=require('express');
const router=express.Router();
var app= express();
var mysql=require('mysql');
/*var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
*/
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
/*passport.deserializeUser(function(id, done) {
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
*/
router.post('/',upload.array('userfile',15), function(req,res){


    let sql='INSERT INTO board_db (title,content,department) VALUES (?,?,?)';
    let sqlFile = 'INSERT INTO file_table (keyNum,fileName) VALUES ?'
    let title=req.body.title;
    let content=req.body.content;
    //var file=req.files;
     department=req.body.department;
    let Value = []


       pool.getConnection(async (err,connection) =>{
         if(err) throw err;
         else{
          await connection.query(sql,[title,content,department], async function(err,result){
             if(err){
               console.log(err);

            }
            else if(req.files == null || req.files == undefined || req.files == "" ){

              if(err) throw err;
              else{
                console.log('except file board_db is save');
                res.send(true);
              }
              connection.destroy();
            }

           else {
                await req.files.map(Data => Value.push([result.insertId,Data.filename]))
                await connection.query(sqlFile,[Value],function(err){
                 if(err){
                    console.log(err);
                    console.log('query err')
                   }
                   else{
                     res.json({ans:true});
                     }
                     connection.destroy();
               })
             }

           })

         }
       })
   });



module.exports=router;
