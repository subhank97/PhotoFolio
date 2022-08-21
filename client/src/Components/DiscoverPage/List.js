import React from 'react'
import Card from './Card';

function List({ data, user }) {

  return (
  <ul className="list">
    {Array.isArray(data) ? 
        data.map((item) => {
    return (
    <Card
      key={item.id}
      item={item}
      user={user}
    />
  );
}) : null }
</ul>
)}

export default List;