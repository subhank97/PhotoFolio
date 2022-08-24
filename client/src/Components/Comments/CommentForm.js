import React, { useState } from 'react'
import CommentCard from './CommentCard';

function CommentForm({ id, user, comments, addComment, setComments, getComments }) {

  const [newComment, setNewComment] = useState("")

  const handleComment = (e) => {
    e.preventDefault()
    fetch('/comments', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: newComment,
        user_id: user.id,
        item_id: id
      })
    })
      .then(res => res.json())
      .then(newComment => addComment(newComment))
  }

  return (
    <div className='comment-section'>
      <h5>
        Comments:
      </h5>
      <div className='comment-card'>
        <div>

          {comments.map(comment => {
            return (
              <div key={comment.id}>
                <CommentCard setComments={setComments} id={comment.id} comment={comment.comment}
                  user={comment.user.full_name} comments={comments} />
              </div>
            )
          })}
        </div>
      </div>
      <div className='comment-form'>
        <form onSubmit={handleComment}>
          <input
            type="text"
            name="comment"
            onChange={(e => setNewComment(e.target.value))}
            value={newComment}
            placeholder="Add a comment..."
          /> {" "}
          <input type="submit" name="submit" className="submit" />
        </form>
      </div>
    </div>
  )
}
// setComments={setComments} comments={comments} user={user} change={change} setChange={setChange} deleteComment={deleteComment}

export default CommentForm;