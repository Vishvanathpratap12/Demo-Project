const nodemailer = require('nodemailer');


const sendEmail = async (emailBody) => {

    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vishvanath.pratap12@gmail.com',
            pass: 'mjvjbnakshwcwzvo'
        }
    });

    /*
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: 'tech@10dtechnologies.com',
            pass: 'tech@zoho10D'
        }
    });
    */

    const mailOptions = {
        from: 'tech@10dtechnologies.com',
        to: emailBody.to,
        subject: emailBody.subject,
        text: emailBody.body
    };

    const mailResult = await transporter.sendMail(mailOptions)
    console.log('mailResult => ',mailResult)
    if (mailResult.messageId) return true
    return false
    
}


module.exports = {
  sendEmail
}