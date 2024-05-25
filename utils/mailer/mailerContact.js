const { transport } = require("./mailerTransport");
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, './mailHtml/emailContact.html');
const htmlTemplate = fs.readFileSync(htmlPath, 'utf8');

async function sendContactEmail(data) {
    const mailOptions = {
        from: `"Tacarte" <${process.env.MAILER_SENDER}>`,
        to: process.env.MAILER_EMAIL_GESTION,
        subject: 'Message Ta Carte',
        html: htmlTemplate
            .replace('{{prenom}}', String(data.prenom))  // Convertir en chaîne
            .replace('{{email}}', String(data.email))    // Convertir en chaîne
            .replace('{{message}}', String(data.message)),  // Convertir en chaîne
    };

    try {
        const info = await transport.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Failed to send email: %s', error);
    }
}

module.exports.sendContactEmail = sendContactEmail;