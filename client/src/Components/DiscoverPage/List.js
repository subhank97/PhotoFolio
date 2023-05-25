import React from 'react';
import Card from './Card';

function List({ data, user, comments, addComment, setComments, getComments }) {
  return (
    <div className="ds-list">
      {Array.isArray(data)
        ? data.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              item={item}
              user={user}
              comments={Object.values(comments).filter((comment) => comment.item_id === item.id)}
              addComment={addComment}
              setComments={setComments}
              getComments={getComments}
            />
          ))
        : null}
    </div>
  );
}

export default List;