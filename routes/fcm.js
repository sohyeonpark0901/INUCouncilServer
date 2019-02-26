
module.exports = async function(department){
  var mysql=require('mysql');
  var pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'qkrthgus1558',
    database:'inunion',
    connectionLimit:10
  }); 
 
var fcm = require('fcm-node');
var serverKey = 'AAAAY13-cp4:APA91bFwN3b9W8MKBYQD3q0nOmLjPOBPdu6wusOS8RkM1UU-4kaPDxZ6UIKib99f2Y-9NZu28ODhYTcNYZu06R_avb7ziTaezfnlltTrbw6Lu4aUpRqp4YpVrY4evdlnP9Clj0ho8YaR';
var FCM = new fcm(serverKey);


  
var sqlSelect='SELECT token FROM fcm_db WHERE department=?';

    
    var tokens=[];
    pool.getConnection(async (err,connection) =>{
      if(err) throw err;
      else{
    await connection.query(sqlSelect,[department],async function(err,result){
       if(err){
         console.log(err);
         console.log('tokenSelect is fail');
       }else{
        for(i=0;i<=result.length;i++){

          if( i != result.length) {
            tokens.push(result[i].token)
          }
          else{
            console.log(tokens)
            let message = {
              registration_ids: tokens,
    
              notification: {
                  title: "new message",
                  body: "새로운 공지가 등록되었어요",
                  sound:"default",
                  click_action:"FCM_PLUGIN_ACTIVITY",
                  icon:"fcm_push_icon"
              },
    
            priority:"high",
          }
          
          FCM.send(message,function(err, response) {
            if(err){
                console.log('err--', err);
            }else {
                console.log('response-----', response);
            }
         
        })
        }  
      }  
        

     
      
         }
       connection.destroy();
     })
   }
    });
  
  
 
  

}
 

 