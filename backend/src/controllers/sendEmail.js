import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'get.bulk.leb@gmail.com', 
    pass: 'ujwymorrxolrbyxp', 
  },
});

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body; 
  
  try {
    const mailOptions = {
      from: 'get.bulk.leb@gmail.com',
      to: 'alimokbel2022@hotmail.com', 
      subject: 'New Message from Your Website',
      html: `
        <p>Hello</p>
        <p>You have received a new message from ${name} (${email}):</p>
        <p>${message}</p>
        <p>Best regards,</p>
        <p>Your Website Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

export { sendEmail };
