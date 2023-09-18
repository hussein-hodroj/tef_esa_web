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


export const getHomepageData = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM homepage';
  cnx.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Something went wrong' });
    } else {
      res.status(200).json(results);
    }
  });
});



export const updateHomepageData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    exams,
    body,
    usefullinks,
    titlelink1,
    link1,
    titlelink2,
    link2,
    titlelink3,
    link3,
    titlelink4,
    link4,
    titlelink5,
    link5,
    titlelink6,
    link6,
    titlelink7,
    link7,
  } = req.body;

  const updateQuery = `
    UPDATE homepage
    SET exams=?, body=?, usefullinks=?, titlelink1=?, link1=?, titlelink2=?, link2=?, titlelink3=?, link3=?,
        titlelink4=?, link4=?, titlelink5=?, link5=?, titlelink6=?, link6=?, titlelink7=?, link7=?
    WHERE homeid=?
  `;

  cnx.query(
    updateQuery,
    [
      exams,
      body,
      usefullinks,
      titlelink1,
      link1,
      titlelink2,
      link2,
      titlelink3,
      link3,
      titlelink4,
      link4,
      titlelink5,
      link5,
      titlelink6,
      link6,
      titlelink7,
      link7,
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


export const deleteHomepageData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM homepage WHERE homeid=?`;
  cnx.query(deleteQuery, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ message: 'Error deleting data' });
    } else {
      res.status(200).json({ message: 'Data deleted successfully' });
    }
  });
});
