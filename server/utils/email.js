const nodeemaiter = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodeemaiter.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Abhang Masale <noreply@abhangmasale.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options?.html
  };

  // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};


module.exports = sendEmail;
