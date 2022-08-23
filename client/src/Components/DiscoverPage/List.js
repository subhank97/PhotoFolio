import React from 'react'
import Card from './Card';

function List({ data, user, comments, setComments }) {

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
      comments={comments}
      setComments={setComments}
    />
  );
}) : null }
</ul>
)}

export default List;