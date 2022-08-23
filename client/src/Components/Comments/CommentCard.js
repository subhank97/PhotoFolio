import React from 'react'

function CommentCard({ comments, user, change, setChange }){

  function handleDeleteClick() {
    fetch(`/comments/${id}`, {
        method: "DELETE",
    }).then(() => setChange(!change));
}

const id = comments.id
const comment = comments.comment
const username = user.full_name

  return (
    <div className="comment-card">
      <h5>
        Comments:
      </h5>
      {comment ? 
      <div>
      <p className='display-comment'>
      {comment} - {username}
      </p> 
      <button className="delete-comment" onClick={handleDeleteClick}>X</button>
      </div>
      : ""}
    </div>
  )
}

export default CommentCard;