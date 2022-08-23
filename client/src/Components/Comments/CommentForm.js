import React, { useState } from 'react'
import CommentCard from './CommentCard';

function CommentForm({ id, user, comments, setComments }){
  console.log(comments)

const [newComment, setNewComment] = useState("")
const [change, setChange] = useState(false)

const addComment = (e) => {
  e.preventDefault()
  fetch('/comments', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            comment: newComment, 
            user_id: user.id
      })
      })
  .then(res => res.json())
  .then(newComment => setComments(newComment))
  setNewComment()
}

  return (
    <div className='comment-form'>
        <form onSubmit={addComment}>
            <input
                className='comment-input'
                type="text"
                name="comment"
                onChange={(e => setNewComment(e.target.value))} 
                value={newComment}
                placeholder="Add a comment..."
            /> {" "}
            <input type="submit" name="submit"  className="submit" />
            <br></br>
            <br></br>
            <CommentCard comments={comments} user={user} change={change} setChange={setChange}/>
        </form>
    </div>
  )
}

export default CommentForm;