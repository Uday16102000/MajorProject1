const nodeMailer = require('../config/nodemailer');
// const comment=require
const fs = require('fs');
// const css = fs.existsSync('./css/new_comment.css', 'utf8');-
// console.log(css);
exports.newComment = (comment) => {
 

   let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
   htmlString = `
   <html>
     <head>
       <link rel="stylesheet" type="text/css" href="path/to/your/css/file.css">
     </head>
     <body>
       ${htmlString}
     </body>
   </html>
 `;
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
