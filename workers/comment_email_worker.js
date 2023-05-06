const queue=require('../config/kue');
const commentMailer=require('../mailers/comments_malers');
queue.process('emails',function(job,done){
    console.log('emails worker is doing a job',job.data);
    commentMailer.newComment(job.data);
    done();
})