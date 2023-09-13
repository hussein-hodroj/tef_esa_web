import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql';
import multer from 'multer';
import registerRoute from './src/routes/registers.js';

dotenv.config();

const app = express();
const upload = multer({ dest: '../frontend/public/uploads/' });


app.use(cors()); 
app.use(express.json());
app.use('/register', registerRoute);


 const cnx = mysql.createConnection({


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


app.post('../frontend/public/uploads/', upload.single('profileImage'), (req, res) => {
    const imageUrl = req.file.path; 
    res.json({ imageUrl });
  });


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

export default cnx;