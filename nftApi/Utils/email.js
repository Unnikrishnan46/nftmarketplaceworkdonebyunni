const nodemailer = require("nodemailer")

const sendEmail = async(options) =>{

  //1 Create a transporter
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST ,
  //   port:process.env.EMAIL_PORT,
  //   auth:{
  //     user:process.env.EMAIL_USERNAME,
  //     pass:process.env.EMAIL_PASSWORD
  //   }
  // })

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'keon.hoppe@ethereal.email',
        pass: 'e7rKyDfaNdsWbX8pNu'
    }
});
  //2 Define the email options

  const mailOptions = {
    from: "Sümeyye Yeğen <sumeyyeyegen746@gmail.com>",
    to:options.email,
    subject:options.subject,
    text: options.message,
    // html
  }

  //3 Active send email
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;