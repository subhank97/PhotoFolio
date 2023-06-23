import React from 'react';
import Card from './Card';

function List({ data, user, comments, addComment, setComments, getComments }) {
  return (
    <div class="px-10 py-5 grid grid-cols-2 md:grid-cols-3 gap-4">      
    {Array.isArray(data)
        ? data.map((item) => {
          const itemComments = comments && item && item.id && item.id !== null ?
            Object.values(comments).filter((comment) => comment && comment.item_id === item.id) : [];
          return (
            <Card
              key={item.id}
              id={item.id}
              item={item}
              user={user}
              comments={itemComments}
              addComment={addComment}
              setComments={setComments}
              getComments={getComments}
            />
          );
        })
        : null}
    </div>
  );
}

export default List;
