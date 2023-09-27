
import mysql from 'mysql';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';

dotenv.config();

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});


export const getLockDate = asyncHandler(async (req, res) => {
  const query = `
    SELECT lockdates.id, DATE_FORMAT(lockdates.date, "%Y-%m-%d") AS formattedDate, lockdates.status, homeinfo.title
    FROM lockdates
    INNER JOIN homeinfo ON lockdates.infoid = homeinfo.infoid
  `;

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json(results);
    }
  });
});

export const getTitle = asyncHandler(async (req, res) => {
  const query = `
    SELECT title FROM homeinfo
  `;

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json(results);
    }
  });
});



export const deleteLockDate = asyncHandler(async (req, res) => {
  const lockDateId = req.params.id;

  const deleteQuery = 'DELETE FROM lockdates WHERE id = ?';

  dbConnection.query(deleteQuery, [lockDateId], (err, result) => {
    if (err) {
      console.error('Error deleting lock date:', err);
      res.status(500).json({ message: 'Something went wrong' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Lock date deleted successfully' });
      } else {
        res.status(404).json({ message: 'Lock date not found' });
      }
    }
  });
});


export const insertLockDate = asyncHandler(async (req, res) => {
  const { title, date, status } = req.body;
  const selectInfoidQuery = 'SELECT infoid FROM homeinfo WHERE title = ?';
  dbConnection.query(selectInfoidQuery, [title], (err, results) => {
    if (err) {
      console.error('Error fetching infoid:', err);
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Title not found' });
      return;
    }
    const infoid = results[0].infoid;
    const insertLockdateQuery = 'INSERT INTO lockdates (infoid, date, status) VALUES (?, ?, ?)';
    dbConnection.query(insertLockdateQuery, [infoid, date, status], (err, result) => {
      if (err) {
        console.error('Error inserting data into lockdates:', err);
        res.status(500).json({ message: 'Something went wrong' });
      } else {
        res.status(201).json({ message: 'Lock date inserted successfully' });
      }
    });
  });
});

export const updateLockDate = asyncHandler(async (req, res) => {
  const lockDateId = req.params.id;
  const { title, date, status } = req.body;

  const selectInfoidQuery = 'SELECT infoid FROM homeinfo WHERE title = ?';
  dbConnection.query(selectInfoidQuery, [title], (err, results) => {
    if (err) {
      console.error('Error fetching infoid:', err);
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Title not found' });
      return;
    }

    const infoid = results[0].infoid;

    const updateLockDateQuery = 'UPDATE lockdates SET infoid = ?, date = ?, status = ? WHERE id = ?';
    dbConnection.query(
      updateLockDateQuery,
      [infoid, date, status, lockDateId],
      (err, result) => {
        if (err) {
          console.error('Error updating lock date:', err);
          res.status(500).json({ message: 'Something went wrong' });
        } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Lock date updated successfully' });
          } else {
            res.status(404).json({ message: 'Lock date not found' });
          }
        }
      }
    );
  });
});