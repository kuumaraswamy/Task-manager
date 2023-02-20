const sgMail = require('@sendgrid/mail')

const sendgridAPIKey ='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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (name,email) =>{
    sgMail.send({
        to: email, 
        from: 'kuumaraswamy@gmail.com', 
        subject: 'Thanks for joining In!',
        text: `Welcome to the app ${name},Let me know how you get along with the app !`,
    })
}

const sendWCancelEmail = (name,email) =>{
    sgMail.send({
        to: email, 
        from: 'kuumaraswamy@gmail.com', 
        subject: 'Good Bye!',
        text: `Good Bye to the app ${name},Let me know how you not  get along with the app !`,
    })
}

module.exports = {
    sendWelcomeEmail,
    sendWCancelEmail
}