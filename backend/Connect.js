const express = require('express'); // Use require for CommonJS modules
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const mysql = require("mysql2");

app.use(express.json());
app.use(cors()); // Enable CORS middleware


app.use('/home', require('./src/routes/homepage'));
app.use('/info', require('./src/routes/homeinfo'));

const cnx = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});


cnx.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
    } else {
        console.log("Connected to MySQL");
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    console.error(err.name);
    console.error(err.code);

    res.status(500).json({
        message: "Something Went Wrong",
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
