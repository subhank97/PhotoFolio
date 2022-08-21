import React from 'react'

function CommentCard({ user, comment, id}){

//   function handleDeleteClick() {
//     fetch(`/comments/${id}`, {
//         method: "DELETE",
//     }).then(() => setChange(!change));
// }

  return (
    <div className="comment-card">
      <h5>
        Comments:
      </h5>
      <p>
      {comment ? comment : ""}
      </p>
    </div>
  )
}

export default CommentCard;