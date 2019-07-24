var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');

var authenticModel = {
    authentic: authentic,
    signup: signup,
    socialSignup: socialSignup,
    changePasswordRequest: changePasswordRequest,
    savePasswordRequest: savePasswordRequest
}

function authentic(authenticData) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE email ='${authenticData.email}'`, (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(rows[0]);
                if(rows.length > 0) {
                    bcrypt.compare(authenticData.password, rows[0].password, function (err, isMatch) {
                        if (err) {
                            reject(error);
                        } else if (isMatch) {
                            resolve(rows);
                        }
                        else {
                            reject({"success":false,"message":"password doesnot match"});
                        }
                    });
                }else {
                    reject({"success":false,"message":"User name doesno't exist"});
                }
                

            }
        });
    });

}
function savePasswordRequest(data) {
    return new Promise((resolve, reject)=> {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(data.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                data.password = hash;
                db.query("UPDATE users set password='"+data.password+"' WHERE request_password_key='"+data.key+"'",(error,rows,fields)=>{
                    if(!!error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        dbFunc.connectionRelease;
                        resolve(rows);
                    }
               });
            })

        });
        
    })
}
function changePasswordRequest(data) {
    return new Promise( (resolve, reject) => {
        db.query("UPDATE users set request_password_key='"+data.key+"' WHERE email='"+data.email+"'",(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });    
    });
}

function signup(user) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                db.query("SELECT * FROM users WHERE email='"+user.email+"'", (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length>0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"user already exist ! try with different user"});
                    } else {
                        db.query("INSERT INTO users(email,password)VALUES('" + user.email + "','" + user.password + "')", (error, rows, fields) => {
                            if (error) {
                                dbFunc.connectionRelease;
                                reject(error);
                            } else {
                                dbFunc.connectionRelease;
                                resolve(rows);
                            }
                        });
                    }
                });
            })

        });
    });
}
function socialSignup(user) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE social_login_key ='${user.social_login_key}'`, (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length > 0) {
                dbFunc.connectionRelease;
                resolve(rows);
            } else if(rows.length === 0) {
                db.query("INSERT INTO users(username,email,social_login_key,role_id)VALUES('" + user.username + "','" + user.email + "','" + user.social_login_key + "','" + user.role_id + "')", (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        db.query(`SELECT * FROM users WHERE social_login_key ='${user.social_login_key}'`, (error, rows, fields) => {
                            if (error) {
                                dbFunc.connectionRelease;
                                reject(error);
                            } else if(rows.length > 0) {
                                dbFunc.connectionRelease;
                                resolve(rows);
                            }
                        });
                        
                    }
                });
            }
        })
    });
}
module.exports = authenticModel;



