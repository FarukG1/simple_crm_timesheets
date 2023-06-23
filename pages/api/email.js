// API to send an Email

export default function handler(req, res) {
  let nodemailer = require("nodemailer");
  let data = req.body;
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.ionos.de",
    auth: {
      user: "contact@faruk-kerim.dev",
      pass: "faruk200298@",
    },
    secure: true,
  });
  const mailData = {
    from: "contact@faruk-kerim.dev",
    to: data.email,
    subject: `Versicherung: ${data.versicherung}`,
    html: `
      <div>
        <h4>Vorname: ${data.first_name}</h4>
        <h4>Nachname: ${data.last_name}</h4>
        <h4>Geburtsdatum: ${data.birthdate}</h4>
        <h4>Telefonnummer: <a href="tel:${data.phone_number}">${data.phone_number}</a></h4>
        <h4>Email: <a href="mailto:${data.email}">${data.email}</a></h4>
      </div>
      `,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.status(200);
}
