var express=require('express');
var session=require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var passport = require('passport');


const login = require('./routes/login');
const addressModify=require('./routes/addressModify');
const addressDelete=require('./routes/addressDelete');
const addressSelect=require('./routes/addressSelect');
const addressSave=require('./routes/addressSave');
const calendarSave=require('./routes/calendarSave');
const calendarDelete=require('./routes/calendarDelete');
const calendarSelect=require('./routes/calendarSelect');
const calendarModify=require('./routes/calendarModify')
const boardSave=require('./routes/boardSave');
const boardDelete=require('./routes/boardDelete');
const boardSelect=require('./routes/boardSelect');
const boardModify=require('./routes/boardModify');

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret:'12345asdasd-',
  resave: false,
  saveUninitialized: true,
  store:new MySQLStore({
    host:'localhost',
    port:3306,
    user:'root',
    password:'qkrthgus1558',
    database:'inunion'
  })
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/login',login)
app.use('/addressSelect',addressSelect)
app.use('/addressSave',addressSave);
app.use('/addressModify',addressModify);
app.use('/addressDelete',addressDelete);
app.use('/calendarDelete',calendarDelete);
app.use('/calendarSelect',calendarSelect);
app.use('/calendarSave',calendarSave);
app.use('/calendarModify',calendarModify);
app.use('/boardSave',boardSave);
app.use('/boardDelete',boardDelete);
app.use('/boardSelect',boardSelect);
app.use('/boardModify',boardModify);


app.listen(7001,function(){
  console.log('Connected 7001 port');
})




/*var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var mysql=require('mysql');
var conn=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion'
});
conn.connect();
*/

/*
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
    return hasher({password:pwd,salt:user.salt},function(err,pass,salt,hash){
      console.log(hash)
        if(hash===user.password){
          console.log('LocalStrategy',user);
          done(null,user);
        } else{
          done(null,false);
        }
      })
}
    })

  }
));*/

/*
app.post('/auth/login',passport.authenticate(
  'local',
  {
    successRedirect:'/welcome',
    failureRedirect:'/auth/login',
    failureFlash:false
  }),function(req,res){

  }
)
*/
