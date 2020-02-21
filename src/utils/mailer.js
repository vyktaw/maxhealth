const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(_to, _name, _subject, _body) {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PWD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let clientUrl = `https://oureventlink`;
    var mailOptions = {
        from: "maxhealth@gmail.com",
        to: _to,
        subject: _subject,
        text: _body
    };

    return transporter.sendMail(mailOptions);
}

const send = (_to, _subject, _body) => {
    const msg = {
        to: _to,
        from: 'info@max-tmaxified.com',
        subject: _subject,
        html: _body,
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    sgMail.send(msg);

}



module.exports = {sendEmail, send};