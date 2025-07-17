require('dotenv').config();
const nodemailer = require('nodemailer');

const SendEmailUtility = async (emailTo, emailText, emailSubject) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

  let mailOptions = {
    from: 'Global Routeway Consult <imranorbit5@gmail.com>',
    to: emailTo,
    subject: emailSubject,
    text: emailText,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;
