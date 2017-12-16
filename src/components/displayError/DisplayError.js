import React from 'react';
import { Link } from 'react-router-dom';

const DisplayError = ({ text }) => {
  return (
    <div>
      <h1>Oppps...</h1>
      <h2>{text}</h2>
      <Link to={'/'}>See all posts</Link>
    </div>
  );
};

export default DisplayError;
