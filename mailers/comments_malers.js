const nodeMailer = require('../config/nodemailer');
// const comment=require

exports.newComment = (comment) => {
 

   let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
   nodeMailer.transporter.sendMail({
      from: 'codenodemdb@gmail.com',
      to: comment.user.email,
      subject: "New comment published",
      html: htmlString
   }, (err, info) => {
      if (err) {
         console.log("Error in sending amil,err");
         return;


      }
      console.log('Message send', info);
      return;
   })
}
