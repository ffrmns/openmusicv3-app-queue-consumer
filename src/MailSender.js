const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music V3 App',
      to: targetEmail,
      subject: 'Ekspor Daftar Lagu di Playlist',
      text: 'Terlampir hasil dari ekspor daftar lagu di playlist',
      attachments: [
        {
          filename: 'songs_in_playlist.json',
          content,
        },
      ],
    };
    return this.transporter.sendMail(message);
  }
}

module.exports = MailSender;
