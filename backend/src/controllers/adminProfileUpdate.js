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

export const getAdminProfile = (req, res) => {
  const { adminID } = req.params;

  dbConnection.query(
    'SELECT `UserID`, `Username`, `Email` FROM `users` WHERE `UserID` = ?',
    [adminID],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      const adminInfo = rows[0];
      res.json({ adminInfo });
    }
  );
};

export const updateAdminProfile = async (req, res) => {
  const { adminID } = req.params;
  const { username, email, newPassword } = req.body;

  const updatedAdmin = {};

  if (username) {
    updatedAdmin.Username = username;
  }

  if (email) {
    updatedAdmin.Email = email;
  }

  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updatedAdmin.Password = hashedPassword;
  }

  dbConnection.query(
    'UPDATE `users` SET ? WHERE `UserID` = ? AND `Role` = "admin"',
    [updatedAdmin, adminID],
    (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.json({ message: 'Admin profile updated successfully' });
    }
  );
};
