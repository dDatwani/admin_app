var nodemailer = require("nodemailer");
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
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
    /*let messageBodyJson = JSON.stringify(messageBody);
    var from_email = new helper.Email('mailtodeepak.me@gmail.com');
    var to_email = new helper.Email(to);
    var subject = 'Forgot Password request from admin-app';
    var content = new helper.Content('text/plain', messageBody);
    var mail = new helper.Mail(from_email, subject, to_email, content);
    
    var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
    });
    return new Promise( (resolve, reject)=> {
        sg.API(request, function(error, response) {
            if(error) {
                reject(error);
            }else {
                console.log('is this resolve');
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
                resolve(response);
            }
            
          });
    });*/
    let messageBodyJson = JSON.stringify(messageBody)
    return new Promise( (resolve, reject)=> {
        smtpTransport.sendMail({  //email options
            from: "deepak.nouse@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
            to: to, // receiver
            subject: "Password reset mail", // subject
            text: messageBodyJson // body
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
