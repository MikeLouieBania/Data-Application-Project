var mysql = require('mysql2');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodeapps'
});

conn.connect(function(error){
    if (error) throw error
    console.log("Database Connection Successful")
})

module.exports = conn;