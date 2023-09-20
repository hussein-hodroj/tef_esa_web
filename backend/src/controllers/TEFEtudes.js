import mysql from 'mysql';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
dotenv.config();

const cnx = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});


export const getTefEtudeData = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM homeinfo where infoid=2';
  cnx.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json(results);
    }
  });
});

export const getTefEtudeDate = asyncHandler(async (req, res) => {
  // const query = 'SELECT date FROM lockdates WHERE status=1';
  const query = 'SELECT DATE_FORMAT(date, "%Y-%m-%d") AS day FROM lockdates WHERE status = 1';
  cnx.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json(results);
    }
  });
});
