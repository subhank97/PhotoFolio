import React from 'react';
import Card from './Card';

function List({ data, user, comments, addComment, setComments, getComments, onImageLoad }) {
  return (
    <div className="md:columns-3 bg-black pr-3 gap-2">
      {Array.isArray(data) ? (
        data.map((item) => {
          const itemComments = comments && item && item.id && item.id !== null ?
            Object.values(comments).filter((comment) => comment && comment.item_id === item.id) : [];
          return (
            <div key={item.id}>
              <Card
                id={item.id}
                item={item}
                user={user}
                comments={itemComments}
                addComment={addComment}
                setComments={setComments}
                getComments={getComments}
                onImageLoad={onImageLoad}
              />
            </div>
          );
        })
      ) : null}
    </div>
  );
}

export default List;
