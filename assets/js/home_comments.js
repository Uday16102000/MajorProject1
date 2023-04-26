// // // method to submit the form data for new comment using AJAX
// {
// let createComment=function()
// {
//     let newCommentForm=$('#new-comment-form');
//     newCommentForm.submit(function(e)
//     {
//       e.preventDefault();
//       $.ajax({
//         type:'post',
//         url:'comments/create',
//         data:newCommentForm.serialize(),
//         success:function(data){
//             console.log(data);
//             let newComment=newCommentDom(data.data.comment);
//             // console.log(newComment);
//                     $('#post-comment-list>ul').prepend(newComment);
//         },error:function(error)
//         {
//             console.log(error.responseText);
//         }
//       })
//     }
//     )
// }

// //method to create comment in DOM
// let newCommentDom= function(comment)
// {
//     return $(`<li id="comment-${comment._id}">
//     <p>
           
//                     <small>
//                             <a  class="delete-comment-button" href="/comments/destroy/${comment._id }">X</a>
//                     </small>
                    
                    
//             ${comment.content }
//             <br>
//             <small>
//             ${comment.user.name }

//             </small>
//     </p>
//     </li>

//   `)
// }
// createComment();
// }