var express=require('express');
var session=require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var passport = require('passport');


const login = require('./routes/login');
const addressModify=require('./routes/addressModify');
const addressDelete=require('./routes/addressDelete');
const addressSelect=require('./routes/addressSelect');
const addressSort=require('./routes/addressSort');
const addressSave=require('./routes/addressSave');
const calendarSave=require('./routes/calendarSave');
const calendarDelete=require('./routes/calendarDelete');
const calendarSelect=require('./routes/calendarSelect');
const calendarModify=require('./routes/calendarModify')
const boardSave=require('./routes/boardSave');
const boardDelete=require('./routes/boardDelete');
const boardSelect=require('./routes/boardSelect');
const boardModify=require('./routes/boardModify');
const boardSort=require('./routes/boardSort');
const boardSelectOne=require('./routes/boardSelectOne');
const addressSelectAll=require('./routes/addressSelectAll');
const tokenSave=require('./routes/tokenSave');
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

app.use('/imgload',express.static('board_file_save/'));

app.use('/login',login)
app.use('/addressSelect',addressSelect);
app.use('/addressSort',addressSort);
app.use('/addressSave',addressSave);
app.use('/addressModify',addressModify);
app.use('/addressDelete',addressDelete);
app.use('/addressSelectAll',addressSelectAll);
app.use('/calendarDelete',calendarDelete);
app.use('/calendarSelect',calendarSelect);
app.use('/calendarSave',calendarSave);
app.use('/calendarModify',calendarModify);
app.use('/boardSave',boardSave);
app.use('/boardDelete',boardDelete);
app.use('/boardSelect',boardSelect);
app.use('/boardModify',boardModify);
app.use('/boardSort',boardSort);
app.use('/boardSelectOne',boardSelectOne);
app.use('/tokenSave',tokenSave)

app.listen(7001,function(){
  console.log('Connected 7001 port');
})




