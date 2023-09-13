
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const cnx = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});


exports.getHomepageData = (req, res) => {
  const query = 'SELECT * FROM homepage';
  cnx.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json(results);
    }
  });
};
