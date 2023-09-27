import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql';
import multer from 'multer';
import registerRoute from './src/routes/registers.js';
import homeRoute from './src/routes/homepage.js';
import infoRoute from './src/routes/homeinfo.js';
import loginRoute from './src/routes/login.js';
import protectedRoute from './src/routes/protected.js';
import forgotPasswordRoute from './src/routes/forgotpassword.js';
import resetPasswordRoute from './src/routes/resetPassword.js';
import TEFEtudes from './src/routes/TEFEtudes.js';
import TEFCanada from './src/routes/TEFCanada.js';
import TEFAQ from './src/routes/TEFAQ.js';
import TEFCourse from './src/routes/TEFCourse.js';
import adminProfileRoute from './src/routes/adminProfileUpdate.js'

import  EmailTemplate  from './src/routes/emailTemplates.js';
import emailRoute from './src/routes/sendEmail.js';
import status from './src/routes/Status.js';
dotenv.config();

const app = express();
const upload = multer({ dest: '../frontend/public/uploads/' });


app.use(cors()); 
app.use(express.json());
app.use('/register', registerRoute);

app.use('/home', homeRoute);
app.use('/info', infoRoute);
app.use('/',loginRoute);
app.use('/protected',protectedRoute);
app.use('/',forgotPasswordRoute);
app.use('/',resetPasswordRoute);
app.use('/TEFEtudes', TEFEtudes);
app.use('/TEFCanada', TEFCanada);
app.use('/TEFAQ', TEFAQ);
app.use('/TEFCourse', TEFCourse);
app.use('/',adminProfileRoute);
app.use('/email',EmailTemplate);
app.use('/send-email',emailRoute);
app.use('/status',status);
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