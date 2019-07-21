var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');

var authenticModel = {
    authentic: authentic,
    signup: signup,
    socialSignup: socialSignup
}

function authentic(authenticData) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE username ='${authenticData.username}'`, (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
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
                db.query("SELECT * FROM users WHERE username='"+user.username+"'", (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length>0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"user already exist ! try with different user"});
                    } else {
                        db.query("INSERT INTO users(username,password)VALUES('" + user.username + "','" + user.password + "')", (error, rows, fields) => {
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
                        dbFunc.connectionRelease;
                        resolve(rows);
                    }
                });
            }
        })
    });
}
module.exports = authenticModel;



