// API to send an Email

export default function handler(req, res) {
  let nodemailer = require("nodemailer");
  let data = req.body;
  const transporter = nodemailer.createTransport({
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PW,
    },
    secure: true,
  });
  const mailData = {
    from: process.env.EMAIL_ADDRESS,
    to: data.email,
    subject: `Termin wird verschoben!`,
    html: `
      <div>
        <h1>Termin wird verschoben</h1>
        <br/><br/>
        <p>Ihr Termin wird vom ${data.old_date} zum ${data.new_date} verschoben</p>
        <br/><br/>
        <p>Mit Freundlichgen Grüßen</p>#
        <br/>
        <p>Ihr Pflegeteam</p>
      </div>
      `,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.status(200);
}
