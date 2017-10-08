const ROOT_URL = 'http://localhost:3001';

const headers = {
  Authorization: 'whatever',
};

export const getCategories = () =>
  fetch(`${ROOT_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ shelf }),
//   }).then(res => res.json());

// export const search = (query, maxResults) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ query, maxResults }),
//   })
//     .then(res => res.json())
//     .then(data => data.books);
