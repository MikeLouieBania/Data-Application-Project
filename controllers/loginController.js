const mysql = require('mysql2');
var conn = require('../database');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = (req, res) => {
    let valid = false;
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

    conn.query(query,(error,result) =>{
      if (error){
        console.error(error)
        res.redirect('/login');
      }
      if(result.length>0){
        res.redirect('/home');
      }
      else{
        res.redirect('/login');
      }
    })
};
