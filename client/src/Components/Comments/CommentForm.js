import React, { useState } from 'react'
import CommentCard from './CommentCard';

function CommentForm({ id, user, setComments }){
const [newComment, setNewComment] = useState("")
const[errors, setErrors] = useState([])


const handleSubmit = (e) => {
  e.preventDefault()
  fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment: newComment, 
      user_id: user.id
    })
  }).then((res) => {
    if (res.ok) {
    res.json().then((newComment) => setComments(newComment))
  } else {
    res.json().then((err) => setErrors(err.errors));
  }})
  setNewComment("")
}

const comment = newComment
console.log(newComment)

  return (
    <div className='comment-form'>
        <form onSubmit={handleSubmit}>
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
            <div className="comment-card">
              <h5>
                Comments:
              </h5>
              <p>
                {comment ? comment : ""}
              </p>
            </div>
        </form>
    </div>
  )
}

export default CommentForm;