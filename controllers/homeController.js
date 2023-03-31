const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeapps'
  });

//Prime Number Validation Function
const isPrime = num => {
    if(num<=1) return false;
    for (let i=2; i<num; i++){
      if(num% i===0) return false;
    }
    return true;
  };
  
//Prime Number Validation
const isValidKey = (a ,b) => {
    return isPrime(a) && b >= 0 && b < 26;
};

exports.getHome= (req, res) => {
    res.render('home');
};

exports.registerHome = (req, res) => {
    const { firstname, middlename, lastname, gender, birthdate, hobby, status, address, zip, city, region} = req.body;
  
    const hobbiesArray = Array.isArray(hobby) ? hobby : [hobby];

    // Encryption
    const encryptedFirstname = encrypt(firstname, 3, 7);
    const encryptedMiddlename = encrypt(middlename, 3, 7);
    const encryptedLastname = encrypt(lastname, 3, 7);
  
    // Insert user into MySQL database
    const query = `INSERT INTO userform (firstname, middlename, lastname, gender, birthdate, hobby, status, address, zip, city, region) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [encryptedFirstname, encryptedMiddlename, encryptedLastname, gender, birthdate, JSON.stringify(hobbiesArray), status, address, zip, city, region ], (err, result) => {
      if (err) {
        console.error(err);
        res.render('home', { message: 'Error registering user' });
      } else {
        res.render('home', { message: 'User successfully registered' });
      }
    });
  }; 

  function encrypt(text, a, b) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i);
  
      // Checks if the input is letter
      if (/[a-zA-Z]/.test(char)) {
        let code = text.charCodeAt(i);
  
        // Uppercase
        if (code >= 65 && code <= 90) {
          char = String.fromCharCode(((a * (code - 65) + b) % 26) + 65);
        }
  
        // Lowercase
        else if (code >= 97 && code <= 122) {
          char = String.fromCharCode(((a * (code - 97) + b) % 26) + 97);
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