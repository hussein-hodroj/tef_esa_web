import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();


const cnx = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  cnx.query(
    'SELECT `UserID`, `Username`, `Password`, `Email`, `Role` FROM `users` WHERE `Email` = ?',
    [email],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Incorrect email. Please check your email.' });
      }

      const user = rows[0];

      bcrypt.compare(password, user.Password, (bcryptErr, result) => {
        if (bcryptErr) {
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (!result) {
          return res.status(400).json({ message: 'Incorrect password. Please try again.' });
        }

        const token = generateToken(user);

        res.json({ token, user });
      });
    }
  );
};


export default loginUser;
