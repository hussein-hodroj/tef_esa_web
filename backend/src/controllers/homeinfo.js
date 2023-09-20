import mysql from 'mysql';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();

const cnx = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});


export const getHomeinfoData = asyncHandler(async (req, res) => {
  const { type } = req.params; 
  
  const query = 'SELECT * FROM homeinfo WHERE type = ?';

  cnx.query(query, [type], (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json(results);
    }
  });
});



export const updateHomeinfoData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title, information, Currency, fees, link, type
  } = req.body;

  const updateQuery = `
    UPDATE homeinfo
    SET title=?, information=?, usefullinks=?, Currency=?, fees=?, link=?, type=?
    WHERE infoid=?
  `;

  cnx.query(
    updateQuery,
    [
      title, information, Currency, fees, link, type,
      id,
    ],
    (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ message: 'Error updating data' });
      } else {
        res.status(200).json({ message: 'Data updated successfully' });
      }
    }
  );
});



export const deleteHomeinfoData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM homeinfo WHERE infoid=?`;
  cnx.query(deleteQuery, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ message: 'Error deleting data' });
    } else {
      res.status(200).json({ message: 'Data deleted successfully' });
    }
  });
});

