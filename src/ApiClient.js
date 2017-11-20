import axios from 'axios';

const ROOT_URL = 'http://localhost:3001';

const headers = {
  Authorization: 'whatever',
};

export const getCategories = () =>
  fetch(`${ROOT_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPosts = () =>
  fetch(`${ROOT_URL}/posts`, { headers }).then(res => res.json());

export const getPostsByCategory = category =>
  fetch(`${ROOT_URL}/${category}/posts`, { headers }).then(res => res.json());

export const addNewPost = post => {
  axios({
    method: 'POST',
    url: `${ROOT_URL}/posts`,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    data: post,
  })
    .then(data => console.log('Dadddd ', data))
    .catch(error => console.log('Err ', error));
};

// export const addNewComment = comment => {
//   console.log('====================================');
//   console.log('commment api ', comment);
//   console.log('====================================');
//   return fetch(`${ROOT_URL}/comments`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ comment }),
//   }).then(res => res.json());
// };

export const getCommentsByPost = id => {
  return fetch(`${ROOT_URL}/posts/${id}/comments`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};

export const addNewComment = comment => {
  axios({
    method: 'POST',
    url: `${ROOT_URL}/comments`,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    data: comment,
  })
    .then(data => console.log('Dadddd ', data))
    .catch(error => console.log('Err ', error));
};
