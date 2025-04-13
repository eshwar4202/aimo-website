var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eshwar4202@gmail.com',
    pass: 'aakv myyt nopx qjav '
  }
});

var mailOptions = {
  from: 'lax.mi42gss@gmail.com',
  to: 'eshwar4202@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
