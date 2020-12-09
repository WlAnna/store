const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')


const auth = {
    auth: {
        api_key: process.env.API_MAILGUN,
        domain: process.env.DOMAIN
    }
}

const transporter = nodemailer.createTransport(mailGun(auth))


const sendMail = (email, name, message, cb) => {
    const mailOptions = {
        from: email,
        to: 'anna.wlodarczyk14@gmail.com',
        subject: `Contact Form from ${name}`,
        text: message
      
    }
    
    transporter.sendMail(mailOptions, (err, data) => {
        if(err) {
            cb(err, null)
        } else {
            cb(null, data)
        }
    })   
}

module.exports = sendMail 
