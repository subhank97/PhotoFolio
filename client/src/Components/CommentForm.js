import React, { useState } from 'react'
import CommentCard from './CommentCard';

function CommentForm(){

const [comment, setComment] = useState("")

  return (
    <div>
        <form onSubmit>
            <input
                type="text"
                name="comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="Add a comment..."
                className="input-text"
            />{" "}
            <input type="submit" name="submit"  className="submit"/>
            {comment ? <CommentCard /> : ""}
        </form>
    </div>
  )
}

export default CommentForm;