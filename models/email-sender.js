require('dotenv').config();
const domain = 'sandbox76f0c2c52eec440ab2e33b26b4ca832a.mailgun.org';
const API_KEY = process.env.API_KEY;
// eslint-disable-next-line no-unused-vars
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: domain });
// const html_body =
//   '<html><body><h1>Aceasta este o probă de email HTML</h1><p>Salut, lume!</p></body></html>';

const authenticateEmail = (address, token) => {
  const data = {
    from: 'Testing API <radu.danila008@gmail.com>',
    to: address,
    subject: 'Hello',
    // text: 'Testing some Mailgun awesomeness!',
    html: `<html><body><h2>Please click <a href="http://localhost:5000/auth/verify/${token}" style="background-color: #0074d9; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Authenticate button</a></h2></body></html>`,
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if (error) {
      console.log(error);
    }
  });
};

module.exports = { authenticateEmail };
