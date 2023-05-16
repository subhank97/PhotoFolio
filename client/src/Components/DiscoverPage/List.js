import React from 'react'
import Card from './Card';

function List({ data, user, comments, addComment, setComments, getComments}) {
  console.log(data)
  return (
  <ul className="list">
    {Array.isArray(data) ? 
        data.map((item) => {
    return (
    <Card
      key={item.id}
      id={item.id}
      item={item}
      user={user}
      comments={Object.values(comments).filter(comment => comment.item_id === item.id)}
      addComment={addComment}
      setComments={setComments}
      getComments={getComments}
    />
  );
}) : null }
</ul>
)}

export default List;