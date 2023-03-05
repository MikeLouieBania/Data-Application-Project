const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodeapps'
});

exports.getRegisterPage = (req, res) => {
  res.render('register', { message: null });
};

exports.registerUser = (req, res) => {
  const { email, password, usertype } = req.body;

  // Insert user into MySQL database
  const query = `INSERT INTO users (email, password, usertype) VALUES (?, ?, ?)`;
  connection.query(query, [email, password, usertype], (err, result) => {
    if (err) {
      console.error(err);
      res.render('register', { message: 'Error registering user' });
    } else {
      res.render('login', { message: 'User successfully registered' });
    }
  });
};
 