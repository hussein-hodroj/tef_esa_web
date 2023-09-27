import multer from 'multer';
import asyncHandler from 'express-async-handler';
import mysql from 'mysql';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const cnx = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null,"../frontend/public/uploads/")
    } catch (error) {
      console.error('Error:', error.message);
    }
  },
  filename: (req, file, cb) => {
    try {
      if (file) {
        cb(null, file.originalname);
      } else {
        cb(null, null); 
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
});
export const upload = multer({ storage: storage });

export const registerCandidate = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
     
    await Promise.all([
    
      body('Title').notEmpty().isString().escape().run(req),
      body('PassportNumber').notEmpty().isString().escape().run(req),
      body('FirstName').notEmpty().isString().escape().run(req),
      body('LastName').notEmpty().isString().escape().run(req),
      body('TongueLanguage').notEmpty().isString().escape().run(req),
      body('Nationality').notEmpty().isString().escape().run(req),
      body('Address').notEmpty().isString().escape().run(req),
      body('Country').notEmpty().isString().escape().run(req),
      body('Town').notEmpty().isString().escape().run(req),
      body('Email').notEmpty().isEmail().normalizeEmail().run(req),
      body('Phone').notEmpty().isString().escape().run(req),
      body('Motivation').notEmpty().isString().escape().run(req),
      body('BookDate').notEmpty().isDate().run(req),
      body('examId').notEmpty().isInt().run(req),
      body('DateOfBirth').notEmpty().isDate().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const sql =
      "INSERT INTO `registrations` (Title, PassportNumber, FirstName, LastName, TongueLanguage, Nationality, Address, Country, Town, Email, Phone, Motivation, PassportPhoto, BookDate, examId, DateOfBirth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      req.body.Title,
      req.body.PassportNumber,
      req.body.FirstName,
      req.body.LastName,
      req.body.TongueLanguage,
      req.body.Nationality,
      req.body.Address,
      req.body.Country,
      req.body.Town,
      req.body.Email,
      req.body.Phone,
      req.body.Motivation,
      req.file.filename,
      req.body.BookDate,
      req.body.examId,
      req.body.DateOfBirth,
      
    ];

    if (req.body.accept === "true") {
      cnx.query(sql, values, async (err, data) => {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ message: 'Failed to register candidate' });
        }

      const getEmailContentSQL = "SELECT Subject, Body FROM emailtemplates WHERE TemplateID = ?";
const TemplateID = 1; 

cnx.query(getEmailContentSQL, [TemplateID], async (err, templateData) => {
  if (err) {
    console.error('Error fetching email content:', err);
    return res.status(500).json({ message: 'Failed to fetch email content' });
  }

  const [template] = templateData;
  const candidateEmailSubject = template.Subject; 
  const candidateEmailContent = template.Body;
  const adminEmailSubject = template.Subject; 
  const adminEmailContent = template.Body; 

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'get.bulk.leb@gmail.com',
      pass: 'ujwymorrxolrbyxp',
    },
  });

  const candidateMailOptions = {
    from: 'get.bulk.leb@gmail.com',
    to: req.body.Email, 
    subject: candidateEmailSubject, 
    text: candidateEmailContent, 
  };

  const adminMailOptions = {
    from: 'get.bulk.leb@gmail.com',
    to: 'husseinhodroj2@gmail.com', 
    subject: adminEmailSubject, 
    text: adminEmailContent, 
  };

  await transporter.sendMail(candidateMailOptions);
  await transporter.sendMail(adminMailOptions);

  return res.json(data);
});

      });
    
  }
  else {
    res.status(500).json({ message: 'please accept the terms' });
  } 
}
   catch (error) {
    console.error('Error registering candidate:', error);
    res.status(500).json({ message: 'Failed to register candidate' });
  }
});

export const getInfo = asyncHandler(async (req, res) => {
  try {
    const sql = "SELECT * FROM registerinfo";

    cnx.query(sql, (err, data) => {
      if (err) {
        console.error('Error retrieving data:', err);
        return res.status(500).json({ message: 'Failed to retrieve data' });
      }

      return res.json(data);
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ message: 'Failed to retrieve data' });
  }
});

export const getCandidateById = asyncHandler(async (req, res) => {
  try {
    const { CandidateID } = req.params;

    if (!CandidateID) {
      return res.status(400).json({ message: 'Candidate ID is required' });
    }

    const getCandidateSQL = 'SELECT * FROM registrations WHERE CandidateID = ?';
    cnx.query(getCandidateSQL, [CandidateID], async (err, candidateData) => {
      if (err) {
        console.error('Error fetching candidate:', err);
        return res.status(500).json({ message: 'Failed to fetch candidate' });
      }

      if (candidateData.length === 0) {
        return res.status(404).json({ message: 'Candidate not found' });
      }

      const candidate = candidateData[0]; 

      return res.json(candidate);
    });
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({ message: 'Failed to fetch candidate' });
  }
});


export const getCandidates = asyncHandler(async (req, res) => {
try{
const get = "SELECT r.*, h.title, h.fees, h.Currency FROM registrations AS r INNER JOIN homeinfo AS h ON h.infoid = r.examId"

cnx.query(get, (err, data) => {
  if (err) {
    console.error('Error retrieving data:', err);
    return res.status(500).json({ message: 'Failed to retrieve data' });
  }

  return res.json(data);
});
} catch (error) {
console.error('Error retrieving data:', error);
res.status(500).json({ message: 'Failed to retrieve data' });
}

})

export const updateInfo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      FirstName,
      LastName,
      Email,
      Phone,
      BookDate,
      PaymentStatus,
      examId,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Candidate ID is required' });
    }

    const checkCandidateSQL = 'SELECT * FROM registrations WHERE CandidateID = ?';
    cnx.query(checkCandidateSQL, [id], async (err, candidateData) => {
      if (err) {
        console.error('Error checking candidate:', err);
        return res.status(500).json({ message: 'Failed to check candidate' });
      }

      if (candidateData.length === 0) {
        return res.status(404).json({ message: 'Candidate not found' });
      }

      const oldBookDate = candidateData[0].BookDate; 

      const updateCandidateSQL =
        'UPDATE registrations SET FirstName=?, LastName=?, Email=?, Phone=?, BookDate=?, PaymentStatus=?, examId=? WHERE CandidateID = ?';

      const updateValues = [
        FirstName,
        LastName,
        Email,
        Phone,
        BookDate,
        PaymentStatus,
        examId,
        id,
      ];

      cnx.query(updateCandidateSQL, updateValues, async (updateErr) => {
        if (updateErr) {
          console.error('Error updating candidate:', updateErr);
          return res.status(500).json({ message: 'Failed to update candidate' });
        }

     
        if (oldBookDate !== BookDate) {
          
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'get.bulk.leb@gmail.com',
              pass: 'ujwymorrxolrbyxp',
            },
          });

          const emailSubject = 'Mise à jour de votre date de réservation';
const emailContent = `
Bonjour,

Nous tenons à vous informer que votre date de réservation a été mise à jour avec succès. Voici les détails mis à jour :

Nouvelle date de réservation : ${BookDate}

Si vous avez des questions ou avez besoin d'informations supplémentaires, n'hésitez pas à nous contacter.

Cordialement,
Votre entreprise
`; 

          const emailOptions = {
            from: 'get.bulk.leb@gmail.com',
            to: Email,
            subject: emailSubject,
            text: emailContent,
          };

          await transporter.sendMail(emailOptions);
        }

        return res.json({ message: 'Candidate information updated successfully' });
      });
    });
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ message: 'Failed to update candidate' });
  }
});



export const deleteCandidate = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Candidate ID is required' });
    }

    const checkCandidateSQL = 'SELECT * FROM registrations WHERE CandidateID = ?';
    cnx.query(checkCandidateSQL, [id], async (err, candidateData) => {
      if (err) {
        console.error('Error checking candidate:', err);
        return res.status(500).json({ message: 'Failed to check candidate' });
      }

      if (candidateData.length === 0) {
        return res.status(404).json({ message: 'Candidate not found' });
      }

      const deleteCandidateSQL = 'DELETE FROM registrations WHERE CandidateID = ?';

      cnx.query(deleteCandidateSQL, [id], async (deleteErr) => {
        if (deleteErr) {
          console.error('Error deleting candidate:', deleteErr);
          return res.status(500).json({ message: 'Failed to delete candidate' });
        }

        return res.json({ message: 'Candidate deleted successfully' });
      });
    });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ message: 'Failed to delete candidate' });
  }
});

export const getStatus = asyncHandler(async (req, res) => {
  try{
  const get = "SELECT r.*, h.title FROM registrations AS r INNER JOIN homeinfo AS h ON h.infoid = r.examId WHERE Status='in progress' AND PaymentStatus= 'progress'"
  
  cnx.query(get, (err, data) => {
    if (err) {
      console.error('Error retrieving data:', err);
      return res.status(500).json({ message: 'Failed to retrieve data' });
    }
  
    return res.json(data);
  });
  } catch (error) {
  console.error('Error retrieving data:', error);
  res.status(500).json({ message: 'Failed to retrieve data' });
  }
  
  })

  
export const updatePaymentStatusAndStatus = asyncHandler(async (req, res) => {
  try {
    const { CandidateID } = req.params;

    if (!CandidateID) {
      return res.status(400).json({ message: 'Candidate ID is required' });
    }

    const checkCandidateSQL = 'SELECT * FROM registrations WHERE CandidateID = ?';
    cnx.query(checkCandidateSQL, [CandidateID], async (err, candidateData) => {
      if (err) {
        console.error('Error checking candidate:', err);
        return res.status(500).json({ message: 'Failed to check candidate' });
      }

      if (candidateData.length === 0) {
        return res.status(404).json({ message: 'Candidate not found' });
      }

      const candidate = candidateData[0];

      if (candidate.Status !== 'in progress' || candidate.PaymentStatus !== 'progress') {
        return res.status(400).json({ message: 'Candidate does not meet the required criteria' });
      }

      const updateStatusSQL = 'UPDATE registrations SET PaymentStatus = ?, Status = ? WHERE CandidateID = ?';
      const updateValues = ['paid', 'accepted', CandidateID];

      cnx.query(updateStatusSQL, updateValues, async (updateErr) => {
        if (updateErr) {
          console.error('Error updating status:', updateErr);
          return res.status(500).json({ message: 'Failed to update status' });
        }

        return res.json({ message: 'PaymentStatus and Status updated successfully' });
      });
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
});


export const rejectCandidateStatus = asyncHandler(async (req, res) => {
  try {
    const { CandidateID } = req.params;

    if (!CandidateID) {
      return res.status(400).json({ message: 'Candidate ID is required' });
    }

    const checkCandidateSQL = 'SELECT * FROM registrations WHERE CandidateID = ?';
    cnx.query(checkCandidateSQL, [CandidateID], async (err, candidateData) => {
      if (err) {
        console.error('Error checking candidate:', err);
        return res.status(500).json({ message: 'Failed to check candidate' });
      }

      if (candidateData.length === 0) {
        return res.status(404).json({ message: 'Candidate not found' });
      }

      const candidate = candidateData[0];

      if (candidate.Status !== 'in progress') {
        return res.status(400).json({ message: 'Candidate is not in progress' });
      }

      const updateStatusSQL = 'UPDATE registrations SET Status = ? WHERE CandidateID = ?';
      const updateValues = ['rejected', CandidateID];

      cnx.query(updateStatusSQL, updateValues, async (updateErr) => {
        if (updateErr) {
          console.error('Error updating status:', updateErr);
          return res.status(500).json({ message: 'Failed to update status' });
        }

        return res.json({ message: 'Status updated to rejected successfully' });
      });
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
});
