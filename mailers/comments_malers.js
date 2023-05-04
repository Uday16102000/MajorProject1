const nodeMailer = require('../config/nodemailer');
// const comment=require

exports.newComment = (comment) => {
   console.log('Inserted in newComment mailer')


   nodeMailer.transporter.sendMail({
      from: 'codenodemdb@gmail.com',
      to: comment.user.email,
      subject: "New comment published",
      html: '<h1>Yup, your comment is published now!</h1>'
   }, (err, info) => {
      if (err) {
         console.log("Error in sending amil,err");
         return;


      }
      console.log('Message send', info);
      return;
   })
}
