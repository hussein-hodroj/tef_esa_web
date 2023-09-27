
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

  export const getEmailTemplate = asyncHandler(async (req, res) => {
    const query = 'SELECT * FROM emailtemplates';
    cnx.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        res.status(500).json({ message: 'Something went wrong' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  
export const updateEmailTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { Subject, Body } = req.body;

  const updateQuery = `
    UPDATE emailtemplates
    SET Subject=?, Body=?
    WHERE TemplateID=?
  `;

  cnx.query(
    updateQuery,
    [Subject, Body, id], 
    (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ message: 'Error updating data' });
      } else {
        if (results.affectedRows > 0) {
          res.status(200).json({ message: 'Data updated successfully' });
        } else {
          res.status(404).json({ message: 'Data not found' });
        }
      }
    }
  );
  
});


