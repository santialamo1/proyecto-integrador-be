const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email@gmail.com',
            pass: 'password1234'
        }
    });

    const mailOptions = {
        from: 'email@gmail.com',
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
