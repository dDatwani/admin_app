var authenticModel = require("../models/authentic.model");


var authenticService = {
    authentic: authentic,
    signup:signup,
    socialSignup: socialSignup,
    changePasswordReq: changePasswordReq
}

function authentic(authenticData) {
    return new Promise((resolve,reject) => {
        authenticModel.authentic(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function signup(signUpData) {
    
    return new Promise((resolve,reject) => {
        authenticModel.signup(signUpData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function socialSignup(data) {
    return new Promise( (resolve, reject) => {
        authenticModel.socialSignup(data).then( (data) => {
            resolve(data)
        }).catch( (err) => {
            reject(err);
        })
    })
}
function changePasswordReq(data) {
    return new Promise( (resolve, reject) => {
        authenticModel.changePasswordRequest(data).then( data => {
            resolve(data);
        }).catch( err => {
            reject(err)
        })
    })
}
module.exports = authenticService;

