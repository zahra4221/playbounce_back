const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    secureConnection: true,
    port: 465,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
    },
});

module.exports.transport = transport