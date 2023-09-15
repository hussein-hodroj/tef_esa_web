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


export const getTefQData = asyncHandler(async (req, res) => {
  const query = 'SELECT fees , infoid,Currency  FROM homeinfo where infoid=4';
  cnx.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json(results);
    }
  });
});