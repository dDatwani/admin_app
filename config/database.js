const mysql = require('mysql');

module.exports = mysql.createPool({
    connectionLimit : 100,
    host : 'eu-cdbr-west-02.cleardb.net',
    user :  'bfe9567fddab7a',
    password: 'd0e1d7aa',
    database: 'heroku_a24c3b085ffcd18'
})





