import multer from 'multer';
import asyncHandler from 'express-async-handler';
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const cnx = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null,"../frontend/public/uploads/")
    } catch (error) {
      console.error('Error:', error.message);
    }
  },
  filename: (req, file, cb) => {
    try {
      if (file) {
        cb(null, file.originalname);
      } else {
        cb(null, null); // Set filename to null if no file
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
});
export const upload = multer({ storage: storage });

export const registerCandidate = asyncHandler(async (req, res) => {
  try {
    const sql =
      "INSERT INTO `registrations` (Title, PassportNumber, FirstName, LastName, TongueLanguage, Nationality, Address, Country, Town, Email, Phone, Motivation, CourseDateID, DateOfBirth, PaymentStatus, PassportPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      req.body.Title,
      req.body.PassportNumber,
      req.body.FirstName,
      req.body.LastName,
      req.body.TongueLanguage,
      req.body.Nationality,
      req.body.Address,
      req.body.Country,
      req.body.Town,
      req.body.Email,
      req.body.Phone,
      req.body.Motivation,
      req.body.CourseDateID,
      req.body.DateOfBirth,
      req.body.PaymentStatus,
      req.file.filename, 
    ];

    cnx.query(sql, values, (err, data) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Failed to register candidate' });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error('Error registering candidate:', error);
    res.status(500).json({ message: 'Failed to register candidate' });
  }
});

export const getInfo = asyncHandler(async (req, res) => {
  try {
    const sql = "SELECT info FROM registerinfo";

    // Execute the SQL query
    cnx.query(sql, (err, data) => {
      if (err) {
        console.error('Error retrieving data:', err);
        return res.status(500).json({ message: 'Failed to retrieve data' });
      }

      // If the query was successful, return the data
      return res.json(data);
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ message: 'Failed to retrieve data' });
  }
});
