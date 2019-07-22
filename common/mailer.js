var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'deepak.nouse@gmail.com', // generated ethereal user
        pass: `*nouse123` // generated ethereal password
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
    // let messageBodyJson = JSON.stringify(messageBody)
    console.log(to);
    return new Promise( (resolve, reject)=> {
        smtpTransport.sendMail({  //email options
            from: 'deepak.nouse@gmail.com', // sender address.  Must be the same as authenticated user if using Gmail.
            to: to, // receiver
            subject: "Password reset request", // subject
            html: messageBody // body
         }, function(error, response){  //callback
            if(error){
               reject(error);
            }else{
                resolve(response);
            }
         });
    });
}

module.exports = {
    mail:mail,
    forgotPasswordMail: forgotPasswordMail
}
