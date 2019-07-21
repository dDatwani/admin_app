var nodemailer = require("nodemailer");
var helper = require('sendgrid').mail;
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
    let messageBodyJson = JSON.stringify(messageBody);
    var from_email = new helper.Email('mailtodeepak.me@gmail.com');
    var to_email = new helper.Email(to);
    var subject = 'Forgot Password request from admin-app';
    var content = new helper.Content('text/plain', messageBody);
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
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
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
                resolve(response);
            }
            
          });
    });
    
}

module.exports = {
    mail:mail,
    forgotPasswordMail: forgotPasswordMail
}
