import React from 'react';

const ListItem = ({ post }) => {
  return (
    <div>
      <p>{post.get('title')}</p>
    </div>
  );
};

export default ListItem;
