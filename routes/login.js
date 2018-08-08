const express = require('express')
const router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mysql=require('mysql');
var pool=mysql.createPool({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion',
  connectionLimit: 10
});
/*pool.getConnection((err,connection) =>{
  if(err) throw err;
  else{

  }
});*/


passport.serializeUser(function(user, done) {
  console.log('serializeUser',user);
  done(null,user.username);
});
<<<<<<< HEAD
/*
passport.deserializeUser(function(id, done) {
=======
/*passport.deserializeUser(function(id, done) {
>>>>>>> f48dac48a4db1c5035421a5d8d17db590075a7fc
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

<<<<<<< HEAD
});*/

=======
});
*/
>>>>>>> f48dac48a4db1c5035421a5d8d17db590075a7fc

passport.use(new LocalStrategy(
  function(username,password,done){
    var uname=username;
    var pwd=password;
    var sql='SELECT * FROM users WHERE username=?';
  //  var sql = 'SELECT * FROM users';
  pool.getConnection((err,connection) =>{
    if(err) throw err;
    else{
       connection.query(sql,uname,function(err,results){
          if(err){
            throw err
            return done('There is no user log')
          }
          else{
          var user=results[0];
          console.log(user)
          if(user == undefined){
            done(null,false)
          }
          else{

          if(user.password == pwd){
            console.log('success')
            done(null,user);
          }
          else{
            done(null,false)
          }
          connection.destroy()
        }
        /*return hasher({password:pwd,salt:user.salt},function(err,pass,salt,hash){
          console.log(hash)
            if(hash===user.password){
              console.log('LocalStrategy',user);
              done(null,user);
            } else{
              done(null,false);
            }
          })*/
    }
        })

    }
  });


  }
));


router.post('/',passport.authenticate('local'),function(req,res){
  res.json({ans:true})
//  connection.distroy();
  })

module.exports = router
