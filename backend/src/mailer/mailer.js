const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: 'dvd_joga@hotmail.com',
        pass: 'familiacoimbra'
    }
})

module.exports = transporter;