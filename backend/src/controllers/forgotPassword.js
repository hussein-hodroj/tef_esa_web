import jwt from 'jsonwebtoken';
import mysql from 'mysql';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const generateToken = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const sendResetPasswordEmail = async (user, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'get.bulk.leb@gmail.com',
        pass: 'ujwymorrxolrbyxp',
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${user.UserID}/${resetToken}`;

    await transporter.sendMail({
      from: 'tef.esa.web@gmail.com',
      to: user.Email,
      subject: 'Reset Your Password',
      html: `
        <p>Hello ${user.Username},</p>
        <p>You have requested to reset your password. Please click on the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Your Website Team</p>
      `,
    });

    console.log('Reset password email sent successfully');
  } catch (error) {
    console.log('Error sending reset password email:', error);
    throw error;
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [user] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'SELECT `UserID`, `Username`, `Email` FROM `users` WHERE `Email` = ?',
        [email],
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

    const resetToken = generateToken(user.UserID);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await new Promise((resolve, reject) => {
      dbConnection.query(
        'UPDATE `users` SET `ResetToken` = ?, `ResetTokenExpiry` = ? WHERE `UserID` = ?',
        [resetToken, resetTokenExpiry, user.UserID],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    await sendResetPasswordEmail(user, resetToken);

    res.json({ message: 'Reset password email sent successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default forgotPassword;
