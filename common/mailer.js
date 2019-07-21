var nodemailer = require("nodemailer");
let testAccount = await nodemailer.createTestAccount();
var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mailtodeepak.me@gmail.com', // generated ethereal user
        pass: `*716dta2534#` // generated ethereal password
   }
});

function mail(messageBody) {
    let messageBodyJson = JSON.stringify(messageBody)
    smtpTransport.sendMail({  //email options
        from: "xxxxxxxxxx95@yahoo.com", // sender address.  Must be the same as authenticated user if using Gmail.
        to: "xxxxxxxxxx95@gmail.com", // receiver
        subject: "Emailing with nodemailer", // subject
        text: messageBodyJson // body
     }, function(error, response){  //callback
        if(error){
           console.log("error",error);
        }else{
            console.log(response);
        }
        
     //    smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
     });
}
function forgotPasswordMail(messageBody, to) {
    let messageBodyJson = JSON.stringify(messageBody)
    return new Promise( (resolve, reject)=> {
        smtpTransport.sendMail({  //email options
            from: "mailtodeepak.me@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
            to: to, // receiver
            subject: "Forgot Password request from admin-app", // subject
            text: messageBodyJson // body
         }, function(error, response){  //callback
            if(error){
               console.log("error",error);
               reject(error)
            }else{
                console.log(response);
                resolve(response);
            }
         //    smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
         });
    });
    
}

module.exports = {
    mail:mail,
    forgotPasswordMail: forgotPasswordMail
}
