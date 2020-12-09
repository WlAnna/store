const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendConfirmationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'anna.wlodarczyk14@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        html: `<h1  style="color:red;">This is title</h1>`
    })
}

module.exports = {
    sendConfirmationEmail
}
