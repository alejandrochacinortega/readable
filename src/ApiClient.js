import axios from 'axios';

const ROOT_URL = 'http://localhost:3001';

const headers = {
  Authorization: 'whatever',
};

export const getCategories = () =>
  fetch(`${ROOT_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPostsByCategory = category =>
  fetch(`${ROOT_URL}/${category}/posts`, { headers }).then(res => res.json());

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ shelf }),
//   }).then(res => res.json());

export const addNewPost = post => {
  console.log('POST ', post);
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

  // axios
  //   .post(`${ROOT_URL}/posts`, post)
  //   .then(data => console.log('DDDDDDD ', data));
  // return fetch(`http://localhost:3001/posts`, {
  //   method: 'POST',
  //   headers: {
  //     ...headers,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(post),
  // })
  //   .then(res => {
  //     console.log('Responde ', res);
  //     return res.json();
  //   })
  //   .then(data => data);
};

// fetch(`${api}/search`, {
//   method: 'POST',
//   headers: {
//     ...headers,
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ query, maxResults }),
// })
//   .then(res => res.json())
//   .then(data => data.books);
