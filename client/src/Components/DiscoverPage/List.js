import React from 'react'
import Card from './Card';

function List({ data }) {

  return (
  <ul className="list">
    {Array.isArray(data) ? 
        data.map((item) => {
    return (
    <Card
      key={item.id}
      item={item}
    />
  );
}) : null }
</ul>
)}

export default List;