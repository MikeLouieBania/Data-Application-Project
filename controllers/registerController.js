const mysql = require('mysql2');
const validator = require('email-validator');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodeapps'
});

function encrypt(text, shift) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char = text.charAt(i);

    // Checks if the input is letter
    if (/[a-zA-Z]/.test(char)) {
      let code = text.charCodeAt(i);

      // Uppercase
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }

      // Lowercase
      else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }

    // Check if the input is a special character or number
    else if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(char)) {
      let code = text.charCodeAt(i);
      char = String.fromCharCode((code + shift) % 128);
    }
    result += char;
  }
  return result;
}

exports.getRegisterPage = (req, res) => {
  res.render('register', { message: null });
};

exports.registerUser = (req, res) => {
  const { email, password, usertype } = req.body;

  // Email Validation
  if (!validator.validate(email)) {
    return res.render('register', { message: 'Invalid email address' });
  }

  // Password Validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.render('register', { message: 'Password must be: 8 characters minimum, at least one number, one lowercase letter, one uppercase letter, and one special character' });
  }

  // Encryption
  const encryptedPassword = encrypt(password,3);

  // Insert user into MySQL database
  const query = `INSERT INTO users (email, password, usertype) VALUES (?, ?, ?)`;
  connection.query(query, [email, encryptedPassword, usertype], (err, result) => {
    if (err) {
      console.error(err);
      res.render('register', { message: 'Error registering user' });
    } else {
      res.render('login', { message: 'User successfully registered' });
    }
  });
};  