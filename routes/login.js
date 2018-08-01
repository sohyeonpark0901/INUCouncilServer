const express = require('express')
const router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mysql=require('mysql');
var conn=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion'
});
conn.connect();


passport.serializeUser(function(user, done) {
  console.log('serializeUser',user);
  done(null,user.authId);
});
passport.deserializeUser(function(id, done) {
  console.log('deserializeUser',id)
  var sql='SELECT * FROM users WHERE authId=?';
  conn.query(sql,[id],function(err,results){
    if(err){
      console.log(err);
      done('There is no user');
    } else{
      done(null,results[0]);
    }
  })
});


passport.use(new LocalStrategy(
  function(username,password,done){
    var uname=username;
    var pwd=password;
    var sql='SELECT * FROM users WHERE username=?';
  //  var sql = 'SELECT * FROM users';
    conn.query(sql,uname,function(err,results){
      if(err){
        return done('There is no user')
      }
      else{
      var user=results[0];
      console.log(user)
      if(user.password == pwd){
        console.log('success')
        done(null,user);
      }
      else{
        done(null,false)
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
));


router.post('/',passport.authenticate(
  'local',
  {
    successRedirect:'/welcome',
    failureRedirect:'/auth/login',
    failureFlash:false
  }),function(req,res){

  })

module.exports = router
