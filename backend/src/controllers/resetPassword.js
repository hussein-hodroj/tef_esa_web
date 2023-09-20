import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const resetPassword = async (req, res) => {
  const { userID, resetToken } = req.params;
  const { password } = req.body;

  try {
    const [user] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'SELECT `UserID` FROM `users` WHERE `UserID` = ?',
        [userID],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const decodedToken = jwt.verify(decodeURIComponent(resetToken), process.env.JWT_SECRET);

    if (decodedToken.userID !== user.UserID) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    await new Promise((resolve, reject) => {
      dbConnection.query(
        'UPDATE `users` SET `Password` = ? WHERE `UserID` = ?',
        [hashedPassword, userID],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default resetPassword;
